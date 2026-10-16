# SOODFOLIO CODING & DESIGN STANDARDS (ANTI-SLOP & DETERMINISTIC UI)
> Đúc kết từ `taste-skill` & `impeccable`. Áp dụng cho toàn bộ dự án SoodFolio (SaaS Web, Auth, Dashboard, Showcase).

---

## 1. TRIẾT LÝ CỐT LÕI & ANTI-SLOP (CORE CREED)

### 1.1. Anti-Default Discipline (Diệt trừ AI Slop)
- **Cấm tư duy template:** Giao diện SaaS độc lập (Auth, Dashboard) KHÔNG dùng giao diện slide-deck của `dev-portfolio`.
- **Substance over spectacle:** Mỗi pixel, khoảng trắng, chuyển động phải có mục đích. Không trang trí thừa thãi.
- **The Ban List (Danh mục cấm tiệt):**
  - 🚫 **The Lila Rule:** Cấm gradient tím-xanh neon kiểu AI phát sáng bừa bãi.
  - 🚫 **3 Equal Cards:** Cấm bố cục 3 thẻ tính năng chia đều nhàm chán kiểu AI landing page.
  - 🚫 **Generic Glassmorphism:** Kính mờ là thấu kính có chủ đích, không lạm dụng làm nền khắp nơi.
  - 🚫 **Fake Mockup:** Cấm vẽ các ô div xám trơn giả vờ làm screenshot. Phải dùng asset thật hoặc data thật.
  - 🚫 **Default Serif:** Không tùy tiện đưa font Serif điệu đà (`Fraunces`, `Instrument Serif`) vào app vận hành.

### 1.2. The Three Dials (Bộ Ba Con Số Định Lượng)
Trước khi code, xác định rõ:
- **`DESIGN_VARIANCE` (1-10):** Độ phá cách (1 = Enterprise tối giản; 5 = B2B Stripe/Linear; 8 = Showcase cao cấp).
- **`MOTION_INTENSITY` (1-10):** Hoạt họa (1 = Tĩnh; 3 = Hover/fade chức năng; 6 = Mượt, có điểm nhấn; 10 = 3D nặng).
- **`VISUAL_DENSITY` (1-10):** Mật độ dữ liệu (3 = Auth/Landing thoáng; 7 = Dashboard/Workspace công thái học).
> **Baseline:**
> - Auth (Login/Register): `Variance: 6` | `Motion: 4` | `Density: 3` (Tập trung chuyển đổi, sắc nét)
> - Dashboard/Editor: `Variance: 5` | `Motion: 3` | `Density: 7` (Scannable, hiệu năng cao)
> - Public Showcase: `Variance: 8` | `Motion: 6` | `Density: 4` (Ấn tượng, tôn vinh tác phẩm)

### 1.3. Four Visitor Modes (4 Chế Độ Trải Nghiệm)
1. **OPERATE (Login, Register, Dashboard, Settings):** Ưu tiên tốc độ thao tác, scannability, công thái học > biểu cảm.
2. **PERSUADE (Landing, Pricing):** Ấn tượng thị giác mạnh mẽ, phân cấp rõ ràng, dẫn dắt CTA.
3. **READ (Docs, Blog):** Trải nghiệm đọc tối ưu, dòng chữ khống chế `45-75ch`.
4. **EXPERIENCE (Profile Viewer):** Nền lùi lại, tôn vinh tác phẩm portfolio của lập trình viên.

---

## 2. MÀU SẮC & BỀ MẶT (SURFACE & COLOR ARCHITECTURE)

### 2.1. Bảng Màu Chiều Sâu & Tránh Đen Tuyệt Đối
- **Cấm `#000000` thuần túy:** Gây gắt mắt, triệt tiêu độ sâu quang học. Dùng hệ màu đen sơn mài (lacquer/graphite):
  - `surface-0` (Canvas nền sâu): `#0a0b0e` hoặc `oklch(0.12 0.015 250)`
  - `surface-1` (Card / Panel thấp): `#12151b` hoặc `oklch(0.16 0.02 250)`
  - `surface-2` (Raised card / Input / Popover): `#1a1e27` hoặc `oklch(0.20 0.025 250)`
  - `surface-3` (Border / Subtle divider): `rgba(255, 255, 255, 0.08)` hoặc `oklch(0.28 0.02 250)`
- **Kỷ luật Accent Độc Tôn:** Tối đa **1 màu Accent chính** (Amber/Gold/Emerald/Cyan), độ bão hòa $< 85\%$. Thêm 1 màu trạng thái (Success/Error dịu).

### 2.2. Viền Vát Cơ Khí & Đổ Bóng Đa Tầng
- **Subtle Inset Highlight:** Viền trên card/button sáng hơn viền dưới (`border-t-white/15 border-b-black/30`) tạo cảm giác vát cạnh cao cấp.
- **Ambient Shadow:** Kết hợp bóng sát viền (`0 1px 2px rgba(0,0,0,0.4)`) và bóng tán rộng mịn (`0 12px 32px -8px rgba(0,0,0,0.5)`).

---

## 3. TYPOGRAPHY & TYPESETTING

### 3.1. Thang Bậc Cố Định (Type Ramp)
- `12px/16px` (xs): Metadata, badge, tags
- `14px/20px` (sm): Label, table cell, secondary text
- `16px/24px` (base): Body chuẩn
- `18px/28px` (lg): Lead paragraph, subheader
- `20px/28px` (xl): Card title, modal title
- `24px/32px` (2xl): Section header
- `30px/36px` (3xl): Page title lớn
- `36px - 60px` (4xl - 6xl): Hero display (chỉ dùng cho Landing/Showcase)

### 3.2. Quy Tắc Khoảng Cách & Đọc Chữ
- **Tracking tỉ lệ nghịch:** Tiêu đề to dùng `tracking-tight` / `tracking-tighter` (-0.02em đến -0.04em). Nhãn nhỏ dùng `tracking-wider` (+0.05em).
- **Italic Descender Clearance:** Chữ nghiêng hoặc display font phải có `leading-[1.15]` trở lên và `pb-1` hoặc `pr-1` để không bị cắt xén đuôi ký tự (`g`, `y`, `p`, `j`).
- **Độ dài dòng (Measure):** Khống chế `max-w-[65ch]` hoặc `max-w-prose` trên nội dung văn bản.
- **Font chữ:** Dùng sans hiện đại sắc nét (Geist Sans, Outfit, DM Sans, Plus Jakarta Sans), phối hợp Mono (Geist Mono, JetBrains Mono) cho số liệu kỹ thuật.

---

## 4. BỐ CỤC, NHỊP ĐIỆU & HỆ THỐNG BENTO

- **Section Family Diversity:** Không lặp lại cùng một kiểu bố cục giữa 2 section liên tiếp.
- **Zigzag Alternation Cap:** Bố cục đảo chiều Ảnh-Chữ / Chữ-Ảnh tối đa chỉ 2 lần lặp.
- **Eyebrow Restraint:** Nhãn nhỏ (eyebrow) tối đa 1 lần trên mỗi 3 section.
- **Bento Cell Count Rule:** Số ô Bento phải khớp chính xác với tính năng thật; cấm tạo ô rỗng trang trí. Có 1 ô Hero chủ đạo (span 2 cột/hàng), các ô phụ bổ trợ nền tương phản.

---

## 5. CHUYỂN ĐỘNG & TƯƠNG TÁC (MOTION & INTERACTION)

### 5.1. Triết Lý & Tốc Độ
- **One Focal Sequence:** Chỉ có 1 chuỗi chuyển động chính thu hút ánh nhìn tại một thời điểm.
- **Snappy Micro-interactions:** Phản hồi hover/click/input trong `150ms - 200ms`, easing `cubic-bezier(0.16, 1, 0.3, 1)`. Mở modal `200ms - 280ms`.
- **Zero Rubber-banding:** Cấm hiệu ứng nảy lắc lư kiểu hoạt hình (cartoony bounce). Giữ chuyển động cơ khí, dứt khoát.

### 5.2. Hiệu Năng Compositor-Only
- Chỉ animate thuộc tính GPU: `transform`, `opacity`. Cấm animate `width`, `height`, `top`, `left`, `margin`.
- **Cấm `useState` bắt tọa độ chuột / scroll:** Gây giật lag do re-render DOM liên tục. Bắt buộc dùng `motion/react` (`useMotionValue`, `useSpring`, `useTransform`) hoặc CSS variables gắn qua `ref`.
- **Hỗ trợ `prefers-reduced-motion`:** Giảm hoặc tắt animation lớn qua `motion-reduce:transform-none`.

---

## 6. COMPONENT & FORM (CÔNG THÁI HỌC SAAS)

### 6.1. Form & Inputs
- **Chiều cao chuẩn:** `42px - 46px` trên desktop.
- **Rõ ràng:** Luôn có nhãn (Label) độc lập `text-sm font-medium`, không dùng placeholder thay thế nhãn.
- **Focus Ring sắc nét:** `focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 outline-none`.
- **Validation trực quan:** Lỗi hiển thị ngay dưới trường nhập kèm icon và giải thích cụ thể. Nút Submit loading hiển thị spinner thanh mảnh, không làm giật kích thước nút.

### 6.2. Buttons & Iconography
- **Phân cấp:** Primary (nổi bật nhất, màu tương phản cao/accent) > Secondary (viền vát, nền bán trong suốt) > Ghost (chữ + hover subtle).
- **Touch Targets:** Tối thiểu `44px x 44px` cho mọi phần tử click được.
- **Icon thống nhất:** Một bộ icon duy nhất (`@phosphor-icons/react` hoặc `lucide-react`), đồng nhất `stroke-width` (1.5 hoặc 2).

---

## 7. TIÊU CHUẨN KỸ THUẬT FRONTEND

- **Stack:** Next.js App Router (15+), React 19, Tailwind CSS v4, CSS Variables.
- **Server Components mặc định:** Chỉ dùng `'use client'` khi có state, DOM interaction hoặc motion.
- **Mobile Viewport:** Tuyệt đối dùng `min-h-[100dvh]` hoặc `h-[100dvh]`, cấm dùng `h-screen` vì bị thanh URL che khuất.
- **Cấu trúc thư mục:**
  - `src/app/(auth)/`: login, register, forgot-password
  - `src/app/(dashboard)/`: editor, settings, analytics
  - `src/app/(public)/`: landing, public profile viewer
  - `src/components/ui/`: primitives tái sử dụng (button, input, card, modal, badge)

---

## 8. CHECKLIST KIỂM ĐỊNH (PRE-FLIGHT CHECKLIST)

| # | Tiêu chí | Chuẩn đạt |
|---|----------|-----------|
| 1 | **Anti-Slop** | Không gradient tím neon AI, không 3 card chia đều, không badge phát sáng vô nghĩa. |
| 2 | **Visitor Mode** | Auth/Dashboard ở Mode `OPERATE` (nhanh, gọn, scannable); Landing ở `PERSUADE`. |
| 3 | **Độ sâu Bề mặt** | Không `#000000` thuần; card có viền nổi `border-t-white/10`, bóng đổ nhiều lớp. |
| 4 | **Typography** | Tiêu đề lớn có `tracking-tight`; chữ nghiêng có descender clearance; body `max-w-[65ch]`. |
| 5 | **Compositor Only** | 60/120fps; không dùng `useState` bắt chuột/scroll; không animate `width/height`. |
| 6 | **Công thái học Form** | Inputs cao 42-46px, có label, focus-ring rõ ràng, lỗi trực quan, nút submit có loading state. |
| 7 | **Icon Đồng nhất** | Cùng thư viện icon, cùng stroke width, thẳng hàng quang học. |
| 8 | **Responsive** | Không thanh cuộn ngang vỡ layout từ 360px đến 4K; touch target $\ge 44px$. |
| 9 | **Dữ liệu Thật** | Không dùng lorem ipsum vô nghĩa, không dùng khối chữ nhật xám giả vờ làm mockup. |
| 10 | **Tương thích Mobile** | Dùng `min-h-[100dvh]` thay cho `h-screen`. |
