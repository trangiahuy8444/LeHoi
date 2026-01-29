# NỘI DUNG CHI TIẾT CÁC HOẠT ĐỘNG

Tài liệu mô tả đầy đủ nội dung và cấu trúc dự án **Sắc Màu Lễ Hội Quê Hương**, phục vụ giáo viên và người tổ chức.

---

## Tổng quan dự án

| Mục | Nội dung |
|-----|----------|
| **Tên chương trình** | Sắc Màu Lễ Hội Quê Hương |
| **Thể loại** | Ứng dụng web một trang (SPA) — Hoạt động trải nghiệm, hướng nghiệp |
| **Mục tiêu bài học** | Nhận diện, kể tên và hiểu ý nghĩa các lễ hội truyền thống tiêu biểu tại quê hương. |
| **Tagline** | "Hành trình khám phá và gìn giữ bản sắc văn hóa dân tộc" |
| **Công nghệ** | HTML, CSS (Tailwind), JavaScript; Chart.js (CDN); Wayground (quiz nhúng). Dữ liệu trong `shared/data.js`, logic trong `shared/common.js`, định tuyến trong `router.js`. |
| **Chạy thử** | Mở file `index.html` bằng trình duyệt (Chrome/Edge khuyên dùng). Có thể kết nối máy chiếu cho hội trường. |

---

## Cấu trúc thư mục và file

```
lehoi/
├── index.html              # Trang chính, menu, sidebar bảng điểm, modal cộng điểm
├── router.js               # Định tuyến (#intro, #sounds, #visuals, #logic, #crossword, #quiz, #message-final, #final-result)
├── noi-dung-cac-hoat-dong.md
├── shared/
│   ├── data.js             # Dữ liệu: âm thanh, ảnh, 4 thẻ Giai điệu, 4 thẻ Tinh mắt, 2 thử thách Thông thái, 6 hàng ô chữ
│   ├── common.js           # Logic: carousel, bảng điểm nhóm, tạo slide/thẻ/ô chữ, âm nhạc nền
│   └── common.css          # Style bổ sung
├── pages/
│   ├── intro.html          # Giới thiệu chương trình
│   ├── logic.html          # Khung trang Thông thái (nội dung do JS render từ data.js)
│   ├── crossword.html     # Trang Ô chữ bí mật (grid + câu hỏi do JS render)
│   ├── quiz.html           # Trắc nghiệm (iframe Wayground)
│   ├── message-final.html  # Thông điệp cuối
│   ├── message.html        # (trang phụ, không dùng trong menu chính)
│   └── final-result.html   # Kết quả cuối cùng — Nhóm Chiến Thắng
├── image/                  # Ảnh dùng cho Giai điệu (gợi ý) và Tinh mắt
└── sound/                  # File MP3 cho 4 thẻ âm thanh
```

**Lưu ý:** Trang **1. Giai điệu** và **2. Tinh mắt** không dùng file HTML trong `pages/` mà do `router.js` build HTML từ `buildSoundsPageHtml()` / `buildVisualsPageHtml()` và dữ liệu trong `shared/data.js`.

---

## Điều hướng và giao diện chung

### Menu chính (nav)

| Thứ tự | Nhãn menu | Route / Trang |
|--------|-----------|----------------|
| 1 | Giới Thiệu | `#intro` → `pages/intro.html` |
| 2 | 1. Giai Điệu | `#sounds` → HTML build từ JS |
| 3 | 2. Tinh Mắt | `#visuals` → HTML build từ JS |
| 4 | 3. Thông Thái | `#logic` → `pages/logic.html` |
| 5 | 4. Ô Chữ | `#crossword` → `pages/crossword.html` |
| 6 | 5. Trắc nghiệm | `#quiz` → `pages/quiz.html` |
| 7 | Thông Điệp | `#message-final` → `pages/message-final.html` |

### Bảng xếp hạng (sidebar + modal)

- **6 nhóm** (tên lớp): **12A12**, **12A13**, **12A14**, **12A15**, **12A16**, **12A17**.
- Điểm được lưu trong `localStorage` (key: `groupScores`), tải lại trang vẫn giữ điểm.
- **Modal "Cộng Điểm Cho Nhóm":** Chọn nhóm (12A12–12A17), chọn hoạt động (Giai điệu / Tinh mắt / Thông thái / Ô chữ), nhập số điểm, nút **Cộng Điểm** hoặc **Trừ Điểm**.
- **Modal "Bảng Xếp Hạng Đầy Đủ":** Xem toàn bộ 6 nhóm, nút **Xác Nhận Nhóm Thắng Cuộc** → chuyển sang trang Kết quả cuối cùng (`#final-result`), hiển thị **Nhóm Chiến Thắng** và điểm.

### Trang Kết quả cuối cùng (`final-result.html`)

- Tiêu đề: **Kết Quả Cuối Cùng**.
- Hiển thị **Nhóm Chiến Thắng:** tên nhóm (12A12–12A17) và điểm số.
- Nút **Xem Bảng Xếp Hạng Đầy Đủ** để quay lại modal bảng điểm.

---

## Mục lục nội dung chi tiết

1. [Trang Giới thiệu](#1-trang-giới-thiệu)
2. [Hoạt động 1: Giai điệu (Thanh âm Di Sản)](#2-hoạt-động-1-giai-điệu-thanh-âm-di-sản)
3. [Hoạt động 2: Tinh mắt (Nhìn hình đoán lễ)](#3-hoạt-động-2-tinh-mắt-nhìn-hình-đoán-lễ)
4. [Hoạt động 3: Thông thái (Dữ kiện logic)](#4-hoạt-động-3-thông-thái-dữ-kiện-logic)
5. [Hoạt động 4: Ô chữ bí mật (Từ khóa vàng)](#5-hoạt-động-4-ô-chữ-bí-mật-từ-khóa-vàng)
6. [Hoạt động 5: Trắc nghiệm tổng hợp](#6-hoạt-động-5-trắc-nghiệm-tổng-hợp)
7. [Trang Thông điệp](#7-trang-thông-điệp)
8. [Tài nguyên (file âm thanh, hình ảnh, video)](#8-tài-nguyên)

---

## 1. Trang Giới thiệu

**File:** `pages/intro.html`  
**Route:** `#intro` (mặc định khi mở app).

| Mục | Nội dung |
|-----|----------|
| **Tiêu đề** | Sắc Màu Lễ Hội Quê Hương |
| **Phụ đề** | Hoạt động trải nghiệm, hướng nghiệp |
| **Tagline** | "Hành trình khám phá và gìn giữ bản sắc văn hóa dân tộc" |
| **Mục tiêu bài học** | Nhận diện, kể tên và hiểu ý nghĩa các lễ hội truyền thống tiêu biểu tại quê hương. |

---

## 2. Hoạt động 1: Giai điệu (Thanh âm Di Sản)

**Mục đích:** Nghe âm thanh đặc trưng, đoán lễ hội; hướng về tên lễ hội và ý nghĩa văn hóa.

**Cách chơi:** Carousel 4 thẻ. Mỗi thẻ có nút phát âm thanh, câu hỏi gợi mở, nút **Gợi ý** (xem hình ảnh), nút **Đáp án** (xem nội dung đầy đủ). Một số thẻ có kèm video giới thiệu (đặt sau phần Góc Khám Phá). Dữ liệu nguồn: `shared/data.js` → `soundSlides`, `audioSources`, `imageSources`.

---

### Thẻ Âm Thanh Số 1: Tiếng trống (Múa Lân)

| Mục | Nội dung |
|-----|----------|
| **Âm thanh** | Tiếng trống múa lân |
| **File âm thanh** | `./sound/Tiếng trống (lân) - bii hương.mp3` |
| **Hình gợi ý** | `./image/maxresdefault.jpg` |
| **Câu hỏi** | Âm thanh này là linh hồn của những dịp lễ tết lớn nào trong năm? |
| **Tiêu đề đáp án** | TẾT NGUYÊN ĐÁN & TRUNG THU |
| **Nội dung bổ trợ** | Hoạt động đặc trưng: Múa Lân Sư Rồng. |
| **Giới thiệu** | Tết Nguyên Đán là lễ hội cổ truyền lớn nhất và thiêng liêng nhất của người Việt. Đây là thời khắc chuyển giao giữa năm cũ và năm mới, là dịp để những người con xa quê trở về đoàn tụ dưới mái ấm gia đình, cùng nhau thắp nén hương thơm dâng lên tổ tiên. |
| **Ý nghĩa** | • Tạ ơn ông bà, tổ tiên và các vị thần linh.<br>• Gắn kết tình thân gia đình và cộng đồng làng xã.<br>• Gửi gắm hy vọng về một năm mới bình an, sung túc. |
| **Góc Khám Phá** | Trong ngày Tết, tiếng trống múa lân vang lên rộn rã được tin là có năng lượng mạnh mẽ để xua đuổi tà khí (con Niên) và đánh thức những điều may mắn, tài lộc gõ cửa mọi nhà. |

---

### Thẻ Âm Thanh Số 2: Cồng Chiêng

| Mục | Nội dung |
|-----|----------|
| **Âm thanh** | Tiếng Cồng Chiêng |
| **File âm thanh** | `./sound/Không gian văn hóa cồng chiêng Tây Nguyên! - Khương Duy Pleiku Gia Lai.mp3` |
| **Hình gợi ý** | `./image/521-kon_tum-phuocsonkt@gmailcom-le_hoi_mung_lua_moi.jpg` |
| **Câu hỏi** | Âm vang này được ví là 'tiếng nói' của đại ngàn, nối kết con người với thần linh. Nó là linh hồn của các lễ hội tại vùng đất nào? |
| **Tiêu đề đáp án** | LỄ HỘI VĂN HÓA CỒNG CHIÊNG |
| **Dấu hiệu nhận biết** | Không gian văn hóa Tây Nguyên. |
| **Giới thiệu** | Không chỉ là nhạc cụ, Cồng Chiêng được coi là "ngôn ngữ" thiêng liêng để người Tây Nguyên giao tiếp với Giàng (Trời), thần linh và tổ tiên. Âm thanh cồng chiêng khi trầm hùng, khi thánh thót, gắn liền với mọi cột mốc trong vòng đời của con người: từ lễ thổi tai khi chào đời đến lễ bỏ mả khi về với đất. |
| **Ý nghĩa** | • **Tín ngưỡng:** Khẳng định mối quan hệ mật thiết giữa con người - thiên nhiên - thần linh.<br>• **Cộng đồng:** Là "chất keo" gắn kết các thành viên trong buôn làng; tiếng chiêng còn vang là bản sắc còn giữ. |
| **Góc Khám Phá** | Mỗi chiếc cồng, chiêng đều có một vị thần trú ngụ. Người Tây Nguyên tin rằng cồng chiêng càng cổ thì quyền lực của vị thần càng cao. **UNESCO:** Không gian văn hóa Cồng chiêng Tây Nguyên — Kiệt tác truyền khẩu và phi vật thể nhân loại (2005), sau chuyển thành Di sản văn hóa phi vật thể đại diện của nhân loại (2008). |
| **Video** | https://www.youtube.com/watch?v=enE8Iy9NRw8 |

---

### Thẻ Âm Thanh Số 3: Dòng máu Lạc Hồng (Đền Hùng)

| Mục | Nội dung |
|-----|----------|
| **Âm thanh** | Nhạc hào hùng "Dòng máu Lạc Hồng" |
| **File âm thanh** | `./sound/DÒNG MÁU LẠC HỒNG  ĐAN TRƯỜNG  GIỔ TỔ HÙNG VƯƠNG 21_04_2021 - HT PRODUCTIONS.mp3` |
| **Hình gợi ý** | `./image/gio-to-hung-vuong-nguon-goc-y-nghia-ngay-mung-10-thang-3-202302211620428770.jpg` |
| **Câu hỏi** | Lời bài hát hào hùng này nhắc nhở con cháu Rồng Tiên nhớ về ngày giỗ chung của cả dân tộc. Đó là lễ hội nào? |
| **Tiêu đề đáp án** | GIỖ TỔ HÙNG VƯƠNG (LỄ HỘI ĐỀN HÙNG) |
| **Dấu hiệu nhận biết** | Mùng 10 tháng 3 Âm lịch. |
| **Giới thiệu** | Lễ hội Đền Hùng là lễ hội duy nhất ở Việt Nam thờ cúng Quốc Tổ - người có công dựng nước. Bài hát hào hùng này gợi nhắc về truyền thuyết "Con Rồng cháu Tiên", khẳng định nguồn cội chung của mọi người dân Việt Nam dù ở bất cứ nơi đâu. |
| **Ý nghĩa** | • **Đạo lý:** Bài học lớn nhất về lòng biết ơn: "Uống nước nhớ nguồn".<br>• **Đoàn kết:** Củng cố khối đại đoàn kết dân tộc, xem mọi người Việt là "đồng bào" (cùng sinh ra từ một bọc trứng). |
| **Góc Khám Phá** | Tín ngưỡng thờ cúng Hùng Vương ở Phú Thọ đã được UNESCO công nhận là Di sản văn hóa phi vật thể đại diện của nhân loại (2012). |

---

### Thẻ Âm Thanh Số 4: Quan họ (Hội Lim)

| Mục | Nội dung |
|-----|----------|
| **Âm thanh** | Dân ca Bắc Bling / Quan họ |
| **File âm thanh** | `./sound/[ KARAOKE BEAT CHUẨN ] BẮC BLING ( BẮC NINH ) - HOÀ MINZY FT NS XUÂN HINH x MASEW x TUẤN CRY - Hòa Minzy.mp3` |
| **Hình gợi ý** | `./image/gioi-thieu-ve-quan-ho-bac-ninh.jpg` |
| **Câu hỏi** | Những câu hát giao duyên tình tứ, 'người ơi người ở đừng về' là đặc sản của vùng Kinh Bắc. Đây là lễ hội nổi tiếng nào? |
| **Tiêu đề đáp án** | HỘI LIM (BẮC NINH) |
| **Dấu hiệu nhận biết** | Hát Dân ca Quan họ. |
| **Giới thiệu** | Hội Lim là không gian diễn xướng đặc sắc nhất của Dân ca Quan họ Bắc Ninh. Khác với các loại hình khác, Quan họ là lối hát giao duyên tinh tế, trọng tình trọng nghĩa, nơi các liền anh liền chị không chỉ hát mà còn "chơi" quan họ bằng lối ứng xử lịch thiệp, khiêm nhường. |
| **Ý nghĩa** | • **Nghệ thuật:** Đỉnh cao của thơ ca dân gian và nghệ thuật luyến láy.<br>• **Nhân văn:** Đề cao tình người, sự thủy chung và nét thanh lịch của người Kinh Bắc ("Người ơi người ở đừng về"). |
| **Góc Khám Phá** | Người quan họ không gọi là 'hát quan họ' mà gọi là 'chơi quan họ', thể hiện sự tinh tế, thanh lịch và coi trọng văn hóa ứng xử trong giao duyên. **UNESCO:** Dân ca Quan họ Bắc Ninh — Di sản văn hóa phi vật thể đại diện của nhân loại (2009). |
| **Video** | https://www.youtube.com/watch?v=155RebrEZOA |

---

## 3. Hoạt động 2: Tinh mắt (Nhìn hình đoán lễ)

**Mục đích:** Quan sát hình ảnh và gợi ý, đoán tên lễ hội; củng cố kiến thức qua phần giới thiệu và ý nghĩa.

**Cách chơi:** Carousel 4 thẻ. Mỗi thẻ có một hình ảnh, nút **Gợi ý** (xem câu gợi ý), nút **Đáp án** (xem tên lễ hội, giới thiệu, ý nghĩa; một số thẻ có video). Dữ liệu: `shared/data.js` → `visualSlides`, `visualGameImages`.

---

### Thẻ Hình Ảnh Số 1: Tết Nguyên Đán (Hình Mâm ngũ quả)

| Mục | Nội dung |
|-----|----------|
| **Hình ảnh** | `./image/Cau_dua_du_xai.jpeg` |
| **Gợi ý** | "Cầu vừa đủ xài" (Gợi nhớ đến mâm ngũ quả) |
| **Đáp án** | Tết Nguyên Đán |
| **Giới thiệu** | Mâm ngũ quả là lễ vật trang trọng nhất trên bàn thờ gia tiên ngày Tết. Nếu người Bắc chọn 5 màu theo thuyết Ngũ hành (Kim-Mộc-Thủy-Hỏa-Thổ) để cầu sự hài hòa, thì người Nam lại chọn quả theo cách chơi chữ "Cầu - Dừa - Đủ - Xài - Sung" để gửi gắm ước vọng thực tế về một năm mới no đủ. |
| **Ý nghĩa** | Thể hiện lòng hiếu thảo dâng lên tổ tiên và khát vọng về cuộc sống sung túc, trọn vẹn. |

---

### Thẻ Hình Ảnh Số 2: Đua Thuyền

| Mục | Nội dung |
|-----|----------|
| **Hình ảnh** | `./image/lehoiduathuyen.jpeg` |
| **Gợi ý** | "Thuyền rồng lướt sóng, cờ xí rợp trời..." |
| **Đáp án** | Lễ Hội Đua Thuyền |
| **Giới thiệu** | Lễ hội này thường diễn ra ở các vùng sông nước, ven biển vào đầu xuân. Những chiếc thuyền được tạo dáng hình Rồng (Long) thon dài, tượng trưng cho linh vật cai quản nguồn nước. Cuộc đua không chỉ là thi thố sức khỏe mà là nghi lễ "đánh thức" dòng sông, cầu xin thần nước ban tặng mưa thuận gió hòa. |
| **Ý nghĩa** | Biểu dương sức mạnh tập thể, tinh thần thượng võ và khát vọng chinh phục thiên nhiên của cư dân nông nghiệp lúa nước. |

---

### Thẻ Hình Ảnh Số 3: Chùa Hương (Hình Suối Yến)

| Mục | Nội dung |
|-----|----------|
| **Hình ảnh** | `./image/lehoichuahuong.jpg` |
| **Gợi ý** | "Lễ hội kéo dài nhất cả nước, suối Yến, động Hương Tích..." |
| **Đáp án** | Lễ Hội Chùa Hương |
| **Giới thiệu** | Đây là lễ hội có thời gian kéo dài nhất nước ta (3 tháng xuân). Hình ảnh dòng suối Yến tấp nập thuyền bè là biểu tượng của hành trình "cõi trần về cõi Phật". Du khách đến đây không chỉ để lễ bái tại động Hương Tích ("Nam thiên đệ nhất động") mà còn để hòa mình vào non nước hữu tình, tìm sự thanh thản trong tâm hồn. |
| **Ý nghĩa** | Sự giao thoa tuyệt vời giữa Tín ngưỡng thờ Phật và tín ngưỡng thờ Thần tự nhiên (thờ đá, thờ hang động) của người Việt. |
| **Video** | https://www.youtube.com/watch?v=9khO62A3kpA |

---

### Thẻ Hình Ảnh Số 4: Bài Chòi (Hình Chòi canh)

| Mục | Nội dung |
|-----|----------|
| **Hình ảnh** | `./image/lehoibaichoi.jpg` |
| **Gợi ý** | "Chòi con, hiệu lệnh, câu thai..." |
| **Đáp án** | Lễ Hội Bài Chòi |
| **Giới thiệu** | Bài Chòi vừa là trò chơi dân gian vui nhộn, vừa là nghệ thuật diễn xướng độc đáo của miền Trung. Các "anh Hiệu" (người hô thai) sẽ dùng các làn điệu hò, vè hóm hỉnh để hô tên con bài. Người chơi ngồi trên các chòi tre cao, ai có con bài trùng khớp sẽ thắng. Đây là "món ăn tinh thần" không thể thiếu dịp đầu xuân. |
| **Ý nghĩa** | Gìn giữ phương ngữ, nghệ thuật thơ ca dân gian và tạo không gian gắn kết cộng đồng làng xã bình dị, vui tươi. |
| **Góc Khám Phá** | Nghệ thuật Bài Chòi Trung Bộ được UNESCO công nhận là Di sản văn hóa phi vật thể đại diện của nhân loại (2017). |
| **Video** | https://www.youtube.com/watch?v=ywahy4ce5tQ |

---

## 4. Hoạt động 3: Thông thái (Dữ kiện logic)

**File:** `pages/logic.html` — nội dung thử thách do JS render từ `shared/data.js` → `logicChallenges`.

**Mục đích:** Dựa vào 3 dữ kiện cho sẵn để suy luận ra tên lễ hội; mở rộng qua phần giới thiệu, ý nghĩa, Góc Khám Phá và video.

**Luật chơi (trên trang):** Quan sát cả 3 dữ kiện → Thảo luận nhanh trong nhóm → Đưa ra đáp án chính xác nhất. Mỗi thử thách có nút **Hiện đáp án** để xem tên lễ hội và nội dung bổ sung.

---

### Thử thách 1: Lễ hội Tịch Điền

| Mục | Nội dung |
|-----|----------|
| **Dữ kiện 1** | Lễ hội này diễn ra vào đầu xuân, gắn liền với hình ảnh Vua đích thân xuống đồng cày ruộng. |
| **Dữ kiện 2** | Nhằm khuyến khích nông nghiệp, cầu mùa màng bội thu, bắt nguồn từ thời vua Lê Đại Hành. |
| **Dữ kiện 3** | 🐃 Hình ảnh con trâu được vẽ trang trí sặc sỡ và người đóng vai Vua đi cày. |
| **Đáp án** | Lễ Hội Tịch Điền |
| **Giới thiệu** | Tịch Điền Đọi Sơn là lễ hội "xuống đồng" mang tính biểu tượng cao nhất của nền văn minh lúa nước. Sự kiện Vua Lê Đại Hành đích thân cởi hoàng bào, lội ruộng cày những đường cày đầu tiên vào năm 987 là một tuyên ngôn lịch sử: Nhà vua không chỉ trị quốc mà còn trọng nông, đồng cam cộng khổ cùng dân. |
| **Ý nghĩa** | Tôn vinh giá trị của lao động, khuyến khích sản xuất nông nghiệp và cầu mong mùa màng bội thu, quốc thái dân an. |
| **Góc Khám Phá** | Những chú trâu tham gia lễ hội được tuyển chọn rất kỹ lưỡng và được các họa sĩ vẽ trang trí sặc sỡ lên mình, gọi là "Trâu Lá Đa", tạo nên nét độc đáo riêng biệt cho lễ hội này. |
| **Video** | https://www.youtube.com/watch?v=yr_eVzo3Oog |

---

### Thử thách 2: Lễ hội Gióng

| Mục | Nội dung |
|-----|----------|
| **Dữ kiện 1** | Được UNESCO công nhận là Di sản văn hóa phi vật thể đại diện của nhân loại. |
| **Dữ kiện 2** | Tưởng nhớ công ơn của một trong 'Tứ bất tử' - vị thánh trẻ tuổi đánh giặc Ân. |
| **Dữ kiện 3** | 🎋 Gắn liền với hình tượng Ngựa sắt, Roi sắt và Tre ngà. |
| **Đáp án** | Lễ Hội Gióng |
| **Giới thiệu** | Lễ hội Gióng (tại đền Sóc và đền Phù Đổng) được ví như một "kịch trường dân gian" khổng lồ, nơi hàng trăm người dân địa phương cùng tham gia diễn lại trận đánh hào hùng của Thánh Gióng chống giặc Ân. Không có gươm đao thật, trận chiến được mô phỏng đầy nghệ thuật qua các nghi thức như rước kiệu, múa cờ, đánh trận giả. |
| **Ý nghĩa** | Giáo dục lòng yêu nước nồng nàn, ý chí quật cường chống ngoại xâm và khát vọng hòa bình của dân tộc Việt Nam. |
| **Góc Khám Phá** | Hội Gióng được ví như một "kịch trường dân gian" rộng lớn với hàng trăm vai diễn, đạo cụ, y phục quy mô, tất cả đều do chính người dân địa phương đóng vai, không cần diễn viên chuyên nghiệp. **UNESCO:** Hội Gióng ở đền Phù Đổng và đền Sóc — Di sản văn hóa phi vật thể đại diện của nhân loại (2010). |
| **Video** | https://www.youtube.com/watch?v=CtBdgihZVPU |

---

## 5. Hoạt động 4: Ô chữ bí mật (Từ khóa vàng)

**File:** `pages/crossword.html`. Grid và danh sách câu hỏi do JS render từ `shared/data.js` → `crosswordRows`.

**Mục đích:** Giải 6 hàng ngang để lấy 6 chữ cái vàng (cột 5), ghép thành **TỪ KHÓA DỌC: BẢN SẮC**.

**Bố cục:** Trái: 6 câu hỏi + nút **Mở Đáp Án Hàng Này** (khi chọn hàng) + nút **🔐 Mở Từ Khóa Dọc**. Phải: 6 hàng ô chữ. Sau khi nhấn **Mở Từ Khóa Dọc**, hiện khối: **Từ khóa của chương trình** → **BẢN SẮC** → *"Giữ gìn truyền thống là giữ gìn BẢN SẮC — nét riêng của dân tộc, nguồn cội của mỗi con người."*

### Từ khóa bí mật

**BẢN SẮC** (6 chữ cái, đọc từ trên xuống tại cột ô khóa vàng).

---

### Hàng 1 (ĐỒNG BÀO)

| Mục | Nội dung |
|-----|----------|
| **Câu hỏi** | Hai tiếng thiêng liêng gợi nhớ truyền thuyết bọc trăm trứng, dùng để gọi những người cùng chung một giống nòi, một đất nước? |
| **Đáp án** | ĐỒNG BÀO |
| **Chữ khóa (vị trí)** | Chữ **B** ở cột 5 |

---

### Hàng 2 (HẢI PHÒNG)

| Mục | Nội dung |
|-----|----------|
| **Câu hỏi** | Thành phố cảng nổi tiếng với lễ hội Chọi Trâu Đồ Sơn - một lễ hội tôn vinh tinh thần thượng võ và tục thờ cúng thủy thần? |
| **Đáp án** | HẢI PHÒNG |
| **Chữ khóa (vị trí)** | Chữ **Ả** ở cột 5 |

---

### Hàng 3 (TÍN NGƯỠNG)

| Mục | Nội dung |
|-----|----------|
| **Câu hỏi** | Từ chỉ chung niềm tin thiêng liêng của con người vào các lực lượng siêu nhiên (thần, thánh, tổ tiên), là nền tảng của mọi lễ hội? |
| **Đáp án** | TÍN NGƯỠNG |
| **Chữ khóa (vị trí)** | Chữ **N** ở cột 5 |

---

### Hàng 4 (LỊCH SỬ)

| Mục | Nội dung |
|-----|----------|
| **Câu hỏi** | Tham gia lễ hội Đền Hùng hay Hội Gióng là cách sống động nhất để thế hệ trẻ ôn lại dòng chảy hào hùng nào của dân tộc? |
| **Đáp án** | LỊCH SỬ |
| **Chữ khóa (vị trí)** | Chữ **S** ở cột 5 |

---

### Hàng 5 (ĐẮK LẮK)

| Mục | Nội dung |
|-----|----------|
| **Câu hỏi** | Tỉnh Tây Nguyên được mệnh danh là thủ phủ cà phê, nơi diễn ra lễ hội Đua Voi Bản Đôn kịch tính? |
| **Đáp án** | ĐẮK LẮK |
| **Chữ khóa (vị trí)** | Chữ **Ắ** ở cột 5 |

---

### Hàng 6 (TRÒ CHƠI)

| Mục | Nội dung |
|-----|----------|
| **Câu hỏi** | Kéo co, đấu vật, bịt mắt bắt dê, đi cà kheo... là những hoạt động vui chơi giải trí được gọi chung là gì trong lễ hội? |
| **Đáp án** | TRÒ CHƠI |
| **Chữ khóa (vị trí)** | Chữ **C** ở cột 5 |

---

### Thông điệp từ khóa (hiện sau khi nhấn "Mở Từ Khóa Dọc")

- **Tiêu đề phụ:** Từ khóa của chương trình  
- **Từ khóa:** BẢN SẮC  
- **Thông điệp:** Giữ gìn truyền thống là giữ gìn **BẢN SẮC** — nét riêng của dân tộc, nguồn cội của mỗi con người.

---

## 6. Hoạt động 5: Trắc nghiệm tổng hợp

**File:** `pages/quiz.html`  
**Route:** `#quiz`

**Mục đích:** Củng cố kiến thức về lễ hội truyền thống sau 4 hoạt động (Giai điệu, Tinh mắt, Thông thái, Ô chữ).

**Cách thực hiện:** Bài trắc nghiệm trực tuyến nhúng từ **Wayground** (iframe).

| Mục | Nội dung |
|-----|----------|
| **Tiêu đề trang** | Trắc nghiệm tổng hợp |
| **Mô tả** | Làm bài trắc nghiệm để củng cố kiến thức về các lễ hội truyền thống sau 4 hoạt động Giai điệu, Tinh mắt, Thông thái và Ô chữ. |
| **Nguồn quiz** | Wayground (embed) |
| **Link nhúng** | https://wayground.com/embed/quiz/697b20e3ae4bb5e4684c137a |

*Nội dung câu hỏi cụ thể do giáo viên cấu hình trên tài khoản Wayground.*

---

## 7. Trang Thông điệp

**File:** `pages/message-final.html`  
**Route:** `#message-final`

**Vị trí:** Trang cuối trước khi kết thúc chương trình (sau Trắc nghiệm trong menu).

**Nội dung hiển thị:**

- Nhãn: **Thông Điệp**
- Câu trích: *"Đừng chỉ đến lễ hội để **'check-in'**, hãy đến để **'cảm nhận'** và **'tiếp nối'**."*

*(Nội dung có thể chỉnh sửa trực tiếp trong file `pages/message-final.html`.)*

---

## 8. Tài nguyên

### File âm thanh (`sound/`)

| Key trong data | Đường dẫn file (từ thư mục gốc) |
|----------------|----------------------------------|
| drum | `./sound/Tiếng trống (lân) - bii hương.mp3` |
| gong | `./sound/Không gian văn hóa cồng chiêng Tây Nguyên! - Khương Duy Pleiku Gia Lai.mp3` |
| epic | `./sound/DÒNG MÁU LẠC HỒNG  ĐAN TRƯỜNG  GIỔ TỔ HÙNG VƯƠNG 21_04_2021 - HT PRODUCTIONS.mp3` |
| folk | `./sound/[ KARAOKE BEAT CHUẨN ] BẮC BLING ( BẮC NINH ) - HOÀ MINZY FT NS XUÂN HINH x MASEW x TUẤN CRY - Hòa Minzy.mp3` |

### Hình ảnh — Gợi ý Giai điệu (`image/` — tham chiếu trong `imageSources`)

| Index | Đường dẫn |
|-------|-----------|
| 0 | `./image/maxresdefault.jpg` |
| 1 | `./image/521-kon_tum-phuocsonkt@gmailcom-le_hoi_mung_lua_moi.jpg` |
| 2 | `./image/gio-to-hung-vuong-nguon-goc-y-nghia-ngay-mung-10-thang-3-202302211620428770.jpg` |
| 3 | `./image/gioi-thieu-ve-quan-ho-bac-ninh.jpg` |

### Hình ảnh — Tinh mắt (`image/` — tham chiếu trong `visualGameImages`)

| Index | Đường dẫn |
|-------|-----------|
| 1 | `./image/Cau_dua_du_xai.jpeg` |
| 2 | `./image/lehoiduathuyen.jpeg` |
| 3 | `./image/lehoichuahuong.jpg` |
| 4 | `./image/lehoibaichoi.jpg` |

### Video YouTube (nhúng trong Đáp án / Hiện đáp án)

| Hoạt động | Nội dung | URL |
|-----------|----------|-----|
| Giai điệu – Thẻ 2 | Cồng Chiêng | https://www.youtube.com/watch?v=enE8Iy9NRw8 |
| Giai điệu – Thẻ 4 | Quan họ / Hội Lim | https://www.youtube.com/watch?v=155RebrEZOA |
| Tinh mắt – Thẻ 3 | Chùa Hương | https://www.youtube.com/watch?v=9khO62A3kpA |
| Tinh mắt – Thẻ 4 | Bài Chòi | https://www.youtube.com/watch?v=ywahy4ce5tQ |
| Thông thái – Thử thách 1 | Tịch Điền | https://www.youtube.com/watch?v=yr_eVzo3Oog |
| Thông thái – Thử thách 2 | Gióng | https://www.youtube.com/watch?v=CtBdgihZVPU |

---

## Lưu ý kỹ thuật

- **Tailwind CSS & Chart.js:** Tải qua CDN trong `index.html`; cần kết nối Internet khi chạy lần đầu.
- **Đường dẫn âm thanh / ảnh:** Tương đối với thư mục gốc (nơi đặt `index.html`). Đảm bảo thư mục `sound/` và `image/` cùng cấp với `index.html` và file tồn tại đúng tên.
- **Điểm nhóm:** Lưu trong `localStorage` (key `groupScores`). Xóa cache / localStorage sẽ reset điểm.
- **Wayground:** Nếu đổi bài quiz, cập nhật URL iframe trong `pages/quiz.html` và (nếu cần) link trong tài liệu này.
- **Ô chữ:** Từ khóa dọc **BẢN SẮC** và vị trí chữ cái vàng (cột 5) được cấu hình trong `shared/data.js` qua `keyword` và `offset` của từng hàng trong `crosswordRows`.

---

*Tài liệu cập nhật theo toàn bộ nội dung và cấu trúc hiện tại của project.*
