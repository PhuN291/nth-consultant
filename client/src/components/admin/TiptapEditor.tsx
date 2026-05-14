import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Image as ImageIcon,
  Link as LinkIcon,
  Undo,
  Redo,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Props {
  value: string;
  onChange: (html: string) => void;
}

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024; // 5MB

const HOSTNAME_RE = /^[a-z0-9.-]+\.[a-z]{2,}$/i;

function normalizeUrl(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  // mailto: / tel: links pass through as-is
  if (/^(mailto:|tel:)/i.test(trimmed)) return trimmed;
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const u = new URL(withProtocol);
    // hostname phải có TLD hợp lệ (hoặc localhost), không chứa khoảng trắng
    if (!HOSTNAME_RE.test(u.hostname) && u.hostname !== "localhost") {
      return null;
    }
    return u.toString();
  } catch {
    return null;
  }
}

export function TiptapEditor({ value, onChange }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [linkInput, setLinkInput] = useState("");
  const [linkError, setLinkError] = useState<string | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ link: false }),
      Image.configure({ HTMLAttributes: { class: "rounded-lg max-w-full h-auto my-4" } }),
      Link.configure({ openOnClick: false, HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" } }),
    ],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class:
          "prose prose-slate max-w-none min-h-[400px] focus:outline-none px-4 py-3 prose-headings:font-display prose-img:rounded-lg",
      },
    },
  });

  // Sync external value changes into editor (e.g., loading existing post)
  useEffect(() => {
    if (!editor) return;
    if (value === editor.getHTML()) return;
    editor.commands.setContent(value || "", false);
  }, [editor, value]);

  if (!editor) return null;

  const onUploadClick = () => fileInputRef.current?.click();

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";

    if (file.size > MAX_UPLOAD_BYTES) {
      toast({
        title: "Ảnh quá lớn",
        description: `Tối đa 5MB. File này: ${(file.size / 1024 / 1024).toFixed(1)}MB`,
        variant: "destructive",
      });
      return;
    }

    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: fd,
        credentials: "include",
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "Upload thất bại");
      }
      const data = await res.json();
      editor.chain().focus().setImage({ src: data.url, alt: file.name }).run();
    } catch (err: any) {
      toast({
        title: "Upload ảnh thất bại",
        description: err?.message ?? String(err),
        variant: "destructive",
      });
    }
  };

  const openLinkDialog = () => {
    const currentHref = editor.getAttributes("link").href as string | undefined;
    setLinkInput(currentHref ?? "");
    setLinkError(null);
    setLinkDialogOpen(true);
  };

  const submitLink = () => {
    const raw = linkInput.trim();
    if (raw) {
      const normalized = normalizeUrl(raw);
      if (!normalized) {
        setLinkError("URL không hợp lệ. Ví dụ: https://example.com");
        return;
      }
      // Áp link vào text đang chọn; nếu không có selection thì chèn link mới
      const chain = editor.chain().focus().extendMarkRange("link");
      if (editor.state.selection.empty) {
        chain.insertContent(`<a href="${normalized}">${normalized}</a>`).run();
      } else {
        chain.setLink({ href: normalized }).run();
      }
    } else {
      // Để trống → gỡ link hiện có
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    }
    setLinkDialogOpen(false);
  };

  const btn = (active: boolean) =>
    `h-8 w-8 inline-flex items-center justify-center rounded-md text-sm transition-colors ${
      active ? "bg-blue-100 text-blue-700" : "text-slate-600 hover:bg-slate-100"
    }`;

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
      <div className="flex items-center gap-1 border-b border-slate-200 px-2 py-1.5 flex-wrap">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={btn(editor.isActive("bold"))} title="Đậm (Ctrl+B)" aria-label="In đậm">
          <Bold className="w-4 h-4" />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={btn(editor.isActive("italic"))} title="Nghiêng (Ctrl+I)" aria-label="In nghiêng">
          <Italic className="w-4 h-4" />
        </button>
        <span className="w-px h-5 bg-slate-200 mx-1" />
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={btn(editor.isActive("heading", { level: 2 }))} title="Tiêu đề H2" aria-label="Tiêu đề cấp 2">
          <Heading2 className="w-4 h-4" />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={btn(editor.isActive("heading", { level: 3 }))} title="Tiêu đề H3" aria-label="Tiêu đề cấp 3">
          <Heading3 className="w-4 h-4" />
        </button>
        <span className="w-px h-5 bg-slate-200 mx-1" />
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={btn(editor.isActive("bulletList"))} title="Danh sách" aria-label="Danh sách">
          <List className="w-4 h-4" />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={btn(editor.isActive("orderedList"))} title="Danh sách có số" aria-label="Danh sách có thứ tự">
          <ListOrdered className="w-4 h-4" />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={btn(editor.isActive("blockquote"))} title="Trích dẫn" aria-label="Trích dẫn">
          <Quote className="w-4 h-4" />
        </button>
        <span className="w-px h-5 bg-slate-200 mx-1" />
        <button type="button" onClick={onUploadClick} className={btn(false)} title="Chèn ảnh" aria-label="Chèn ảnh">
          <ImageIcon className="w-4 h-4" />
        </button>
        <button type="button" onClick={openLinkDialog} className={btn(editor.isActive("link"))} title="Chèn liên kết" aria-label="Chèn liên kết">
          <LinkIcon className="w-4 h-4" />
        </button>
        <span className="w-px h-5 bg-slate-200 mx-1" />
        <button type="button" onClick={() => editor.chain().focus().undo().run()} className={btn(false)} title="Hoàn tác" aria-label="Hoàn tác">
          <Undo className="w-4 h-4" />
        </button>
        <button type="button" onClick={() => editor.chain().focus().redo().run()} className={btn(false)} title="Làm lại" aria-label="Làm lại">
          <Redo className="w-4 h-4" />
        </button>
        <input ref={fileInputRef} type="file" accept="image/*" onChange={onFileChange} className="hidden" />
      </div>

      <EditorContent editor={editor} />

      <Dialog open={linkDialogOpen} onOpenChange={setLinkDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Chèn liên kết</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="tiptap-link-url">URL</Label>
            <Input
              id="tiptap-link-url"
              value={linkInput}
              onChange={(e) => {
                setLinkInput(e.target.value);
                if (linkError) setLinkError(null);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  submitLink();
                }
              }}
              placeholder="https://example.com"
              autoFocus
            />
            {linkError && <p className="text-sm text-red-600">{linkError}</p>}
            <p className="text-xs text-slate-500">Để trống và bấm Lưu để xoá liên kết hiện có.</p>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setLinkDialogOpen(false)}>
              Huỷ
            </Button>
            <Button type="button" onClick={submitLink}>
              Lưu
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
