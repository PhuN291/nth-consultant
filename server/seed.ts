/**
 * Seed script: tạo admin user đầu tiên + import 5 bài mock posts.
 * Chạy: tsx server/seed.ts
 *
 * Yêu cầu env:
 *   DATABASE_URL              — Postgres connection string
 *   SEED_ADMIN_USERNAME       — username của admin
 *   SEED_ADMIN_PASSWORD       — password (sẽ được hash bằng bcrypt)
 */
import "dotenv/config";
import bcrypt from "bcrypt";
import { db } from "./db";
import { adminUsers, blogPosts } from "@shared/schema";
import { eq } from "drizzle-orm";

const MOCK_POSTS = [
  {
    slug: "huong-dan-quyet-toan-thue-tncn-2024",
    title: "Hướng dẫn quyết toán thuế thu nhập cá nhân năm 2024 mới nhất",
    excerpt:
      "Cập nhật các quy định mới nhất về quyết toán thuế TNCN, hồ sơ cần chuẩn bị và thời hạn nộp để tránh bị phạt.",
    contentHtml: `<p>Quyết toán thuế thu nhập cá nhân (TNCN) là nghĩa vụ bắt buộc đối với cá nhân có thu nhập từ tiền lương, tiền công và một số nguồn khác.</p>
<h2>Đối tượng phải quyết toán</h2>
<ul><li>Cá nhân cư trú có thu nhập từ tiền lương, tiền công.</li><li>Cá nhân uỷ quyền cho tổ chức trả thu nhập quyết toán thay.</li></ul>
<h2>Hồ sơ cần chuẩn bị</h2>
<ul><li>Tờ khai quyết toán thuế (mẫu 02/QTT-TNCN).</li><li>Bảng kê thu nhập và các khoản giảm trừ.</li><li>Chứng từ khấu trừ thuế từ đơn vị chi trả.</li></ul>
<p>Hạn nộp: <strong>chậm nhất ngày 30/04 năm liền sau năm tính thuế</strong>.</p>`,
    category: "Kế toán thuế",
    author: "NTH Consulting",
    coverImageUrl: null as string | null,
  },
  {
    slug: "luu-y-thanh-lap-doanh-nghiep-2024",
    title: "Những lưu ý quan trọng khi thành lập doanh nghiệp năm 2024",
    excerpt:
      "Tổng hợp các thủ tục pháp lý, hồ sơ cần thiết và những điều cần tránh khi bắt đầu khởi nghiệp kinh doanh.",
    contentHtml: `<p>Khởi nghiệp là hành trình thú vị nhưng cũng đầy thử thách, đặc biệt ở khâu pháp lý ban đầu.</p>
<h2>Chọn loại hình doanh nghiệp phù hợp</h2>
<p>TNHH một thành viên, TNHH hai thành viên trở lên, công ty cổ phần — mỗi loại đều có ưu nhược điểm khác nhau về thuế và trách nhiệm.</p>
<h2>Hồ sơ thành lập</h2>
<ul><li>Giấy đề nghị đăng ký doanh nghiệp.</li><li>Điều lệ công ty.</li><li>Danh sách thành viên/cổ đông.</li><li>Bản sao CCCD/Hộ chiếu của các thành viên.</li></ul>`,
    category: "Luật doanh nghiệp",
    author: "NTH Consulting",
    coverImageUrl: null as string | null,
  },
  {
    slug: "toi-uu-chi-phi-thue-doanh-nghiep-sme",
    title: "Cách tối ưu chi phí thuế hợp pháp cho doanh nghiệp vừa và nhỏ",
    excerpt:
      "Chia sẻ kinh nghiệm quản lý chi phí và tận dụng các ưu đãi thuế để tối đa hoá lợi nhuận doanh nghiệp.",
    contentHtml: `<p>Tối ưu thuế là việc <strong>hợp pháp</strong> và cần thiết để doanh nghiệp duy trì lợi nhuận và phát triển bền vững.</p>
<h2>Nguyên tắc cơ bản</h2>
<ul><li>Đầy đủ hoá đơn, chứng từ hợp lệ.</li><li>Phân loại chi phí được trừ và không được trừ.</li><li>Tận dụng các ưu đãi thuế cho ngành nghề/khu vực.</li></ul>`,
    category: "Quản trị tài chính",
    author: "NTH Consulting",
    coverImageUrl: null as string | null,
  },
  {
    slug: "quy-dinh-hoa-don-dien-tu-7-2024",
    title: "Quy định mới về hoá đơn điện tử áp dụng từ tháng 7/2024",
    excerpt:
      "Những thay đổi quan trọng trong việc sử dụng và quản lý hoá đơn điện tử mà kế toán cần nắm rõ.",
    contentHtml: `<p>Từ tháng 7/2024, một số quy định mới về hoá đơn điện tử (HĐĐT) chính thức có hiệu lực.</p>
<h2>Điểm nổi bật</h2>
<ul><li>Bắt buộc HĐĐT có mã của cơ quan thuế với mọi giao dịch.</li><li>Quy chuẩn dữ liệu chung — kết nối trực tiếp với hệ thống thuế điện tử.</li></ul>`,
    category: "Tin tức nội bộ",
    author: "NTH Consulting",
    coverImageUrl: null as string | null,
  },
  {
    slug: "lich-nop-bao-cao-thue-2024",
    title: "Lịch nộp các loại báo cáo thuế trong năm 2024",
    excerpt:
      "Danh sách chi tiết thời hạn nộp tờ khai thuế GTGT, TNCN, TNDN và báo cáo sử dụng hoá đơn.",
    contentHtml: `<p>Để tránh phạt vi phạm hành chính, doanh nghiệp cần ghi nhớ các mốc thời gian sau:</p>
<h2>Báo cáo theo tháng</h2>
<p>Hạn nộp <strong>chậm nhất ngày 20</strong> tháng tiếp theo (GTGT, TNCN nếu kê khai theo tháng).</p>
<h2>Báo cáo theo quý</h2>
<p>Hạn nộp <strong>chậm nhất ngày 30/31</strong> tháng đầu quý sau (GTGT, TNCN, TNDN tạm tính).</p>
<h2>Quyết toán năm</h2>
<p>Hạn <strong>31/03</strong> hằng năm.</p>`,
    category: "Kế toán thuế",
    author: "NTH Consulting",
    coverImageUrl: null as string | null,
  },
];

async function main() {
  const adminUsername = process.env.SEED_ADMIN_USERNAME;
  const adminPassword = process.env.SEED_ADMIN_PASSWORD;

  if (!adminUsername || !adminPassword) {
    console.error("❌ Thiếu SEED_ADMIN_USERNAME hoặc SEED_ADMIN_PASSWORD trong env.");
    process.exit(1);
  }

  // 1. Tạo admin nếu chưa có
  const existing = await db
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.username, adminUsername))
    .limit(1);

  if (existing.length === 0) {
    const passwordHash = await bcrypt.hash(adminPassword, 12);
    await db.insert(adminUsers).values({ username: adminUsername, passwordHash });
    console.log(`✅ Đã tạo admin: ${adminUsername}`);
  } else {
    console.log(`ℹ️  Admin "${adminUsername}" đã tồn tại — bỏ qua.`);
  }

  // 2. Import mock posts (idempotent — không insert nếu slug đã tồn tại)
  for (const post of MOCK_POSTS) {
    const existing = await db.select().from(blogPosts).where(eq(blogPosts.slug, post.slug)).limit(1);
    if (existing.length > 0) {
      console.log(`ℹ️  Post "${post.slug}" đã tồn tại — bỏ qua.`);
      continue;
    }
    await db.insert(blogPosts).values({
      ...post,
      published: true,
      publishedAt: new Date(),
    });
    console.log(`✅ Đã thêm post: ${post.slug}`);
  }

  console.log("\n🎉 Seed hoàn tất.");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
