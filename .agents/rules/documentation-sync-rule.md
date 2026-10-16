# QUY CHUẨN ĐỒNG BỘ TÀI LIỆU DỰ ÁN (DOCUMENTATION SYNC RULE)
> **Phạm vi áp dụng:** Bắt buộc cho toàn bộ dự án SoodFolio (Backend Spring Boot & Frontend Next.js).  
> **Lưu trữ tại:** `D:\Project\SoodFolio\docs\`

---

## 1. NGUYÊN TẮC BẮT BUỘC (MANDATORY RULE)
Mọi công nghệ, thư viện, kiến trúc hệ thống, quy chuẩn kỹ thuật và giải pháp triển khai **từ lúc bắt đầu dự án, hiện tại và trong tương lai** đều phải được ghi chép và cập nhật đầy đủ, chuẩn xác, không bỏ sót vào các file tài liệu tương ứng:
1. **`D:\Project\SoodFolio\docs\document-for-backend-java`**: Tài liệu kỹ thuật Backend (Java 21, Spring Boot 3.4+, Spring Security 6, Data JPA, PostgreSQL, JWT, OAuth2, Architecture Patterns, Database Schema, REST API endpoints, DTOs, Exception Handling...).
2. **`D:\Project\SoodFolio\docs\document-for-frontend-nextjs`**: Tài liệu kỹ thuật Frontend (Next.js 16 App Router, React 19, Tailwind v4, Split-Screen Layout, Token & Cookie Auth, Kinpaku Gold surface tokens, lucide-react, Form Ergonomics, State Management, API Client Interceptor, Auto-Refresh Token...).
3. **`D:\Project\SoodFolio\docs\handoff.md`**: **DUY NHẤT 1 FILE HANDOFF** phản ánh toàn diện tiến độ, hiện trạng, tài khoản test và kế hoạch tiếp theo. Tuyệt đối KHÔNG tạo thêm file handoff ở thư mục gốc, thư mục Temp (`C:\Users\...\AppData\Local\Temp`) hay bất kỳ nơi nào khác. Mọi cập nhật handoff phải ghi đè trực tiếp vào file này!

## 2. KHI NÀO PHẢI CẬP NHẬT?
- **Ngay khi triển khai tính năng mới:** Mỗi khi tạo controller, service, entity mới hoặc component, layout, hook mới, phải cập nhật tài liệu kỹ thuật vào file doc tương ứng.
- **Khi thay đổi cấu trúc hoặc thêm thư viện:** Bổ sung dependency mới vào `pom.xml` hoặc `package.json` phải ghi rõ mục đích, phiên bản và vai trò.
- **Trước khi kết thúc mỗi lượt bàn giao / handoff:** Luôn kiểm tra và cập nhật file `D:\Project\SoodFolio\docs\handoff.md` để đảm bảo phản ánh chính xác 100% hiện trạng code.
