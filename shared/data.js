// Dữ liệu dùng chung cho toàn bộ ứng dụng
const audioSources = {
    'drum': "./sound/Tiếng trống (lân) - bii hương.mp3",
    'gong': "./sound/Không gian văn hóa cồng chiêng Tây Nguyên! - Khương Duy Pleiku Gia Lai.mp3",
    'epic': "./sound/DÒNG MÁU LẠC HỒNG  ĐAN TRƯỜNG  GIỔ TỔ HÙNG VƯƠNG 21_04_2021 - HT PRODUCTIONS.mp3",
    'folk': "./sound/[ KARAOKE BEAT CHUẨN ] BẮC BLING ( BẮC NINH ) - HOÀ MINZY FT NS XUÂN HINH x MASEW x TUẤN CRY - Hòa Minzy.mp3"
};

const imageSources = {
    0: "./image/maxresdefault.jpg",
    1: "./image/521-kon_tum-phuocsonkt@gmailcom-le_hoi_mung_lua_moi.jpg",
    2: "./image/gio-to-hung-vuong-nguon-goc-y-nghia-ngay-mung-10-thang-3-202302211620428770.jpg",
    3: "./image/gioi-thieu-ve-quan-ho-bac-ninh.jpg"
};

const visualGameImages = {
    1: "./image/Cau_dua_du_xai.jpeg",
    2: "./image/lehoiduathuyen.jpeg",
    3: "./image/lehoichuahuong.jpg",
    4: "./image/lehoibaichoi.jpg"
};

const soundSlides = [
    {title:"Múa Lân Sư Rồng",festival:"TẾT NGUYÊN ĐÁN & TRUNG THU",question:"Âm thanh này là linh hồn của những dịp lễ lớn nào trong năm?",supportingContent:"Hoạt động đặc trưng: Múa Lân Sư Rồng.",intro:"Tết Nguyên Đán là lễ hội cổ truyền lớn nhất và thiêng liêng nhất của người Việt. Đây là thời khắc chuyển giao giữa năm cũ và năm mới, là dịp để những người con xa quê trở về đoàn tụ dưới mái ấm gia đình, cùng nhau thắp nén hương thơm dâng lên tổ tiên.",meaning:["Tạ ơn ông bà, tổ tiên và các vị thần linh.","Gắn kết tình thân gia đình và cộng đồng làng xã.","Gửi gắm hy vọng về một năm mới bình an, sung túc."],discovery:"Trong ngày Tết, tiếng trống múa lân vang lên rộn rã được tin là có năng lượng mạnh mẽ để xua đuổi tà khí (con Niên) và đánh thức những điều may mắn, tài lộc gõ cửa mọi nhà.",emoji:"🦁",color:"bg-festive-red",audio:"drum"},
    {title:"Văn Hóa Cồng Chiêng",festival:"LỄ HỘI VĂN HÓA CỒNG CHIÊNG",question:"Âm vang này được ví là 'tiếng nói' của đại ngàn, nối kết con người với thần linh. Nó là linh hồn của các lễ hội tại vùng đất nào?",supportingContent:"Không gian văn hóa Tây Nguyên.",supportingLabel:"Dấu hiệu nhận biết",intro:"Không chỉ là nhạc cụ, Cồng Chiêng được coi là \"ngôn ngữ\" thiêng liêng để người Tây Nguyên giao tiếp với Giàng (Trời), thần linh và tổ tiên. Âm thanh cồng chiêng khi trầm hùng, khi thánh thót, gắn liền với mọi cột mốc trong vòng đời của con người: từ lễ \"thổi tai\" khi chào đời đến lễ \"bỏ mả\" khi về với đất.",meaning:["Tín ngưỡng: Khẳng định mối quan hệ mật thiết giữa con người - thiên nhiên - thần linh.","Cộng đồng: Là \"chất keo\" gắn kết các thành viên trong buôn làng; tiếng chiêng còn vang là bản sắc còn giữ."],discovery:"Mỗi chiếc cồng, chiêng đều có một vị thần trú ngụ. Người Tây Nguyên tin rằng cồng chiêng càng cổ thì quyền lực của vị thần càng cao.",emoji:"🎼",color:"bg-yellow-600",audio:"gong",videoUrl:"https://www.youtube.com/watch?v=enE8Iy9NRw8"},
    {title:"Giỗ Tổ Hùng Vương",festival:"GIỖ TỔ HÙNG VƯƠNG (LỄ HỘI ĐỀN HÙNG)",question:"Lời bài hát hào hùng này nhắc nhở con cháu Rồng Tiên nhớ về ngày giỗ chung của cả dân tộc. Đó là lễ hội nào?",supportingContent:"Mùng 10 tháng 3 Âm lịch.",supportingLabel:"Dấu hiệu nhận biết",intro:"Lễ hội Đền Hùng là lễ hội duy nhất ở Việt Nam thờ cúng Quốc Tổ - người có công dựng nước. Bài hát hào hùng này gợi nhắc về truyền thuyết \"Con Rồng cháu Tiên\", khẳng định nguồn cội chung của mọi người dân Việt Nam dù ở bất cứ nơi đâu.",meaning:["Đạo lý: Bài học lớn nhất về lòng biết ơn: \"Uống nước nhớ nguồn\".","Đoàn kết: Củng cố khối đại đoàn kết dân tộc, xem mọi người Việt là \"đồng bào\" (cùng sinh ra từ một bọc trứng)."],discovery:"Tín ngưỡng thờ cúng Hùng Vương ở Phú Thọ đã được UNESCO công nhận là Di sản văn hóa phi vật thể đại diện của nhân loại vào năm 2012.",emoji:"🛕",color:"bg-blue-600",audio:"epic"},
    {title:"Hội Lim - Quan Họ",festival:"HỘI LIM (BẮC NINH)",question:"Những câu hát giao duyên tình tứ, 'người ơi người ở đừng về' là đặc sản của vùng Kinh Bắc. Đây là lễ hội nổi tiếng nào?",supportingContent:"Hát Dân ca Quan họ.",supportingLabel:"Dấu hiệu nhận biết",intro:"Hội Lim là không gian diễn xướng đặc sắc nhất của Dân ca Quan họ Bắc Ninh. Khác với các loại hình khác, Quan họ là lối hát giao duyên tinh tế, trọng tình trọng nghĩa, nơi các liền anh liền chị không chỉ hát mà còn \"chơi\" quan họ bằng lối ứng xử lịch thiệp, khiêm nhường.",meaning:["Nghệ thuật: Đỉnh cao của thơ ca dân gian và nghệ thuật luyến láy.","Nhân văn: Đề cao tình người, sự thủy chung và nét thanh lịch của người Kinh Bắc (\"Người ơi người ở đừng về\")."],discovery:"Người quan họ không gọi là 'hát quan họ' mà gọi là 'chơi quan họ', thể hiện sự tinh tế, thanh lịch và coi trọng văn hóa ứng xử trong giao duyên.",emoji:"🎶",color:"bg-purple-600",audio:"folk",videoUrl:"https://www.youtube.com/watch?v=155RebrEZOA"}
];

const visualSlides = [
    {title:"Tết Nguyên Đán",hint:"\"Cầu vừa đủ xài\"",hintSub:"(Gợi nhớ đến mâm ngũ quả)",intro:"Mâm ngũ quả là lễ vật trang trọng nhất trên bàn thờ gia tiên ngày Tết. Nếu người Bắc chọn 5 màu theo thuyết Ngũ hành (Kim-Mộc-Thủy-Hỏa-Thổ) để cầu sự hài hòa, thì người Nam lại chọn quả theo cách chơi chữ \"Cầu - Dừa - Đủ - Xài - Sung\" để gửi gắm ước vọng thực tế về một năm mới no đủ.",meaning:["Thể hiện lòng hiếu thảo dâng lên tổ tiên và khát vọng về cuộc sống sung túc, trọn vẹn."]},
    {title:"Lễ Hội Đua Thuyền",hint:"\"Thuyền rồng lướt sóng, cờ xí rợp trời...\"",intro:"Lễ hội này thường diễn ra ở các vùng sông nước, ven biển vào đầu xuân. Những chiếc thuyền được tạo dáng hình Rồng (Long) thon dài, tượng trưng cho linh vật cai quản nguồn nước. Cuộc đua không chỉ là thi thố sức khỏe mà là nghi lễ \"đánh thức\" dòng sông, cầu xin thần nước ban tặng mưa thuận gió hòa.",meaning:["Biểu dương sức mạnh tập thể, tinh thần thượng võ và khát vọng chinh phục thiên nhiên của cư dân nông nghiệp lúa nước."]},
    {title:"Lễ Hội Chùa Hương",hint:"\"Lễ hội kéo dài nhất cả nước, suối Yến, động Hương Tích...\"",intro:"Đây là lễ hội có thời gian kéo dài nhất nước ta (3 tháng xuân). Hình ảnh dòng suối Yến tấp nập thuyền bè là biểu tượng của hành trình \"cõi trần về cõi Phật\". Du khách đến đây không chỉ để lễ bái tại động Hương Tích (\"Nam thiên đệ nhất động\") mà còn để hòa mình vào non nước hữu tình, tìm sự thanh thản trong tâm hồn.",meaning:["Sự giao thoa tuyệt vời giữa Tín ngưỡng thờ Phật và tín ngưỡng thờ Thần tự nhiên (thờ đá, thờ hang động) của người Việt."],videoUrl:"https://www.youtube.com/watch?v=9khO62A3kpA"},
    {title:"Lễ Hội Bài Chòi",hint:"\"Chòi con, hiệu lệnh, câu thai...\"",intro:"Bài Chòi vừa là trò chơi dân gian vui nhộn, vừa là nghệ thuật diễn xướng độc đáo của miền Trung. Các \"anh Hiệu\" (người hô thai) sẽ dùng các làn điệu hò, vè hóm hỉnh để hô tên con bài. Người chơi ngồi trên các chòi tre cao, ai có con bài trùng khớp sẽ thắng. Đây là \"món ăn tinh thần\" không thể thiếu dịp đầu xuân.",meaning:["Gìn giữ phương ngữ, nghệ thuật thơ ca dân gian và tạo không gian gắn kết cộng đồng làng xã bình dị, vui tươi."],videoUrl:"https://www.youtube.com/watch?v=ywahy4ce5tQ"}
];

const logicChallenges = [
    {clues:["Lễ hội này diễn ra vào đầu xuân, gắn liền với hình ảnh Vua đích thân xuống đồng cày ruộng.","Nhằm khuyến khích nông nghiệp, cầu mùa màng bội thu, bắt nguồn từ thời vua Lê Đại Hành.","🐃 Hình ảnh con trâu được vẽ trang trí sặc sỡ và người đóng vai Vua đi cày."],title:"Lễ Hội Tịch Điền",color:"festive-red",intro:"Tịch Điền Đọi Sơn là lễ hội \"xuống đồng\" mang tính biểu tượng cao nhất của nền văn minh lúa nước. Sự kiện Vua Lê Đại Hành đích thân cởi hoàng bào, lội ruộng cày những đường cày đầu tiên vào năm 987 là một tuyên ngôn lịch sử: Nhà vua không chỉ trị quốc mà còn trọng nông, đồng cam cộng khổ cùng dân.",meaning:["Tôn vinh giá trị của lao động, khuyến khích sản xuất nông nghiệp và cầu mong mùa màng bội thu, quốc thái dân an."],discovery:"Những chú trâu tham gia lễ hội được tuyển chọn rất kỹ lưỡng và được các họa sĩ vẽ trang trí sặc sỡ lên mình, gọi là \"Trâu Lá Đa\", tạo nên nét độc đáo riêng biệt cho lễ hội này.",videoUrl:"https://www.youtube.com/watch?v=yr_eVzo3Oog"},
    {clues:["Được UNESCO công nhận là Di sản văn hóa phi vật thể đại diện của nhân loại.","Tưởng nhớ công ơn của một trong 'Tứ bất tử' - vị thánh trẻ tuổi đánh giặc Ân.","🎋 Gắn liền với hình tượng Ngựa sắt, Roi sắt và Tre ngà."],title:"Lễ Hội Gióng",color:"blue-600",intro:"Lễ hội Gióng (tại đền Sóc và đền Phù Đổng) được ví như một \"kịch trường dân gian\" khổng lồ, nơi hàng trăm người dân địa phương cùng tham gia diễn lại trận đánh hào hùng của Thánh Gióng chống giặc Ân. Không có gươm đao thật, trận chiến được mô phỏng đầy nghệ thuật qua các nghi thức như rước kiệu, múa cờ, đánh trận giả.",meaning:["Giáo dục lòng yêu nước nồng nàn, ý chí quật cường chống ngoại xâm và khát vọng hòa bình của dân tộc Việt Nam."],discovery:"Hội Gióng được ví như một \"kịch trường dân gian\" rộng lớn với hàng trăm vai diễn, đạo cụ, y phục quy mô, tất cả đều do chính người dân địa phương đóng vai, không cần diễn viên chuyên nghiệp.",videoUrl:"https://www.youtube.com/watch?v=CtBdgihZVPU"}
];

const crosswordRows = [
    {num:1,word:"ĐỒNG BÀO",cells:["Đ","Ồ","N","G","B","À","O"],keyword:5,offset:0,question:"Hai tiếng thiêng liêng gợi nhớ truyền thuyết bọc trăm trứng, dùng để gọi những người cùng chung một giống nòi, một đất nước?"},
    {num:2,word:"HẢI PHÒNG",cells:["H","Ả","I","P","H","Ò","N","G"],keyword:2,offset:3,question:"Thành phố cảng nổi tiếng với lễ hội Chọi Trâu Đồ Sơn - một lễ hội tôn vinh tinh thần thượng võ và tục thờ cúng thủy thần?"},
    {num:3,word:"TÍN NGƯỠNG",cells:["T","Í","N","N","G","Ư","Ỡ","N","G"],keyword:3,offset:2,question:"Từ chỉ chung niềm tin thiêng liêng của con người vào các lực lượng siêu nhiên (thần, thánh, tổ tiên), là nền tảng của mọi lễ hội?"},
    {num:4,word:"LỊCH SỬ",cells:["L","Ị","C","H","S","Ử"],keyword:5,offset:0,question:"Tham gia lễ hội Đền Hùng hay Hội Gióng là cách sống động nhất để thế hệ trẻ ôn lại dòng chảy hào hùng nào của dân tộc?"},
    {num:5,word:"ĐẮK LẮK",cells:["Đ","Ắ","K","L","Ắ","K"],keyword:2,offset:3,question:"Tỉnh Tây Nguyên được mệnh danh là thủ phủ cà phê, nơi diễn ra lễ hội Đua Voi Bản Đôn kịch tính?"},
    {num:6,word:"TRÒ CHƠI",cells:["T","R","Ò","C","H","Ơ","I"],keyword:4,offset:1,question:"Kéo co, đấu vật, bịt mắt bắt dê, đi cà kheo... là những hoạt động vui chơi giải trí được gọi chung là gì trong lễ hội?"}
];

// --- CẤU HÌNH DỮ LIỆU Ô CHỮ (MỚI: TỪ KHÓA VĂN HÓA) ---
function generateRowData() {
    const data = {};
    crosswordRows.forEach(row => {
        const offset = row.offset || 0;
        const ids = [];
        // Thêm các ô trống ở đầu nếu có offset
        for (let i = 0; i < offset; i++) {
            ids.push(`r${row.num}c${i + 1}`);
        }
        // Thêm các ô chứa chữ cái
        row.cells.forEach((_, i) => {
            ids.push(`r${row.num}c${offset + i + 1}`);
        });
        data[row.num] = { count: ids.length, ids: ids };
    });
    return data;
}
const rowData = generateRowData();

const totalSlides = 4;
const totalVisualSlides = 4;

// Export tất cả các biến ra global scope để các trang con có thể truy cập
window.audioSources = audioSources;
window.imageSources = imageSources;
window.visualGameImages = visualGameImages;
window.soundSlides = soundSlides;
window.visualSlides = visualSlides;
window.logicChallenges = logicChallenges;
window.crosswordRows = crosswordRows;
window.rowData = rowData;
window.totalSlides = totalSlides;
window.totalVisualSlides = totalVisualSlides;
