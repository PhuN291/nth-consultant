import { useState, useEffect, ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Phone } from "lucide-react";

interface ContactDialogProps {
  trigger: ReactNode;
  title?: string;
  description?: string;
  /** Tên dịch vụ hoặc nguồn để admin biết button nào trigger */
  source?: string;
  /** Service tên (nếu có) — sẽ được gửi kèm */
  service?: string;
  /** Mở mặc định, nếu cần điều khiển từ ngoài */
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const STORAGE_KEY = "dl_contact_form_v1";

interface FormState {
  name: string;
  phone: string;
  title: string;
  company: string;
}

const EMPTY: FormState = { name: "", phone: "", title: "", company: "" };

export function ContactDialog({
  trigger,
  title = "Đăng ký nhận tư vấn miễn phí",
  description = "Để lại thông tin, chuyên gia của chúng tôi sẽ liên hệ lại trong vòng 15 phút.",
  source,
  service,
  defaultOpen,
  open: controlledOpen,
  onOpenChange,
}: ContactDialogProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen ?? false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = (v: boolean) => {
    if (!isControlled) setInternalOpen(v);
    onOpenChange?.(v);
  };

  const [form, setForm] = useState<FormState>(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Pre-fill từ localStorage để không phải gõ lại nếu đã liên hệ trước đó
  useEffect(() => {
    if (open && !success) {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) setForm({ ...EMPTY, ...JSON.parse(saved) });
      } catch {}
    }
  }, [open, success]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const payload = {
        name: form.name.trim(),
        phone: form.phone.trim(),
        title: form.title.trim() || null,
        company: form.company.trim() || null,
        service: service || null,
        source: source || (typeof window !== "undefined" ? window.location.pathname : null),
      };
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "Gửi thất bại");
      }
      // Save to localStorage for next time
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
      } catch {}
      setSuccess(true);
    } catch (err: any) {
      setError(err?.message?.replace(/^\d+:\s*/, "") || "Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setSubmitting(false);
    }
  };

  // Reset success state khi đóng dialog
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setSuccess(false);
        setError(null);
      }, 200);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {success ? (
          <div className="text-center py-6 px-2">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold font-display text-slate-900 mb-2">Đã gửi thành công!</h3>
            <p className="text-slate-600 mb-6">
              Cảm ơn bạn. Chuyên viên NTH Consulting sẽ liên hệ lại trong vòng <strong>15 phút</strong> trong giờ làm việc.
            </p>
            <p className="text-sm text-slate-500 mb-4 flex items-center justify-center gap-1.5">
              <Phone className="w-4 h-4" /> Cần gấp? Gọi ngay <a href="tel:0344130989" className="font-bold text-blue-600">0344 130 989</a>
            </p>
            <Button onClick={() => setOpen(false)} className="w-full">
              Đóng
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-display">{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>

            <form onSubmit={onSubmit} className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="contact-name">
                  Họ và tên <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="contact-name"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Nhập tên của bạn..."
                  required
                  disabled={submitting}
                  maxLength={200}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="contact-phone">
                  Số điện thoại <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="contact-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  placeholder="Nhập số điện thoại/Zalo của bạn..."
                  required
                  disabled={submitting}
                  maxLength={20}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="contact-title">Chức danh</Label>
                <Input
                  id="contact-title"
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  placeholder="Nhập chức danh của bạn..."
                  disabled={submitting}
                  maxLength={200}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="contact-company">Tên công ty</Label>
                <Input
                  id="contact-company"
                  value={form.company}
                  onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                  placeholder="Nhập tên công ty của bạn..."
                  disabled={submitting}
                  maxLength={200}
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-3 py-2">
                  {error}
                </div>
              )}

              <DialogFooter className="pt-2">
                <Button type="submit" disabled={submitting} className="w-full">
                  {submitting ? "Đang gửi..." : "Gửi yêu cầu"}
                </Button>
              </DialogFooter>
              <p className="text-xs text-center text-slate-400 pt-1">
                Thông tin của bạn được bảo mật theo chính sách của chúng tôi.
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
