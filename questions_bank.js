/**
 * NGÂN HÀNG 40 CÂU HỎI TRẮC NGHIỆM TIẾNG ANH - REVISION UNITS 10-13
 * Trường Cao đẳng Công nghệ Thủ Đức (TDC)
 * 
 * Mỗi lần làm bài hoặc sinh viên bấm làm lại:
 * - Hệ thống tự động xáo trộn ngẫu nhiên thứ tự 40 câu hỏi.
 * - Xáo trộn ngẫu nhiên vị trí các phương án (A, B, C, D) trong từng câu hỏi.
 * - Đảm bảo tính toán và bảo lưu chính xác tuyệt đối đáp án đúng.
 * - Tuyệt đối không đưa gợi ý / đáp án lúc đang làm bài.
 * - Chỉ sau khi sinh viên nộp bài mới mở khóa kiểm tra đáp án đúng, dịch nghĩa tiếng Việt và giải thích ngữ pháp chi tiết.
 */

const REVISION_40_QUESTIONS = [
  {
    id: 1,
    originalNumber: 1,
    topic: "Superlative of Adjectives (So sánh nhất)",
    question: "Of the four dresses, which is _____ expensive?",
    options: [
      { key: "A", text: "the best" },
      { key: "B", text: "the most" },
      { key: "C", text: "the more" },
      { key: "D", text: "the greater" }
    ],
    correctAnswerText: "the most",
    originalCorrectKey: "B",
    translation: "Trong bốn chiếc váy, chiếc nào là đắt nhất?",
    explanation: "<b>So sánh nhất (Superlative):</b><br>📌 Cụm từ <i>'Of the four dresses'</i> (trong số 4 chiếc váy) chỉ phép so sánh giữa 4 đối tượng (từ 3 đối tượng trở lên) nên bắt buộc phải dùng so sánh nhất.<br>📌 Với tính từ dài <i>'expensive'</i> (3 âm tiết), cấu trúc so sánh nhất là: <b>the most + Adj</b> -> <i>the most expensive</i>.<br>👉 Do đó chọn: <b>the most</b>."
  },
  {
    id: 2,
    originalNumber: 2,
    topic: "Reduced Relative Clause (Rút gọn mệnh đề quan hệ chủ động)",
    question: "The plane ________ 30 passengers crashed into the sea yesterday.",
    options: [
      { key: "A", text: "to carry" },
      { key: "B", text: "carrying" },
      { key: "C", text: "to be carried" },
      { key: "D", text: "being carried" }
    ],
    correctAnswerText: "carrying",
    originalCorrectKey: "B",
    translation: "Chiếc máy bay chở 30 hành khách đã rơi xuống biển ngày hôm qua.",
    explanation: "<b>Rút gọn mệnh đề quan hệ dạng chủ động (Active participle):</b><br>📌 Mệnh đề gốc đầy đủ là: <i>'The plane which carried 30 passengers...'</i><br>📌 Vì mang nghĩa chủ động (chiếc máy bay mang/chở 30 hành khách), mệnh đề quan hệ được rút gọn bằng hiện tại phân từ: <b>V-ing</b> -> <b>carrying</b>.<br>👉 Do đó chọn: <b>carrying</b>."
  },
  {
    id: 3,
    originalNumber: 3,
    topic: "Modal Verbs: Prohibition (Động từ khiếm khuyết chỉ sự cấm đoán)",
    question: "One ______make a U-turn if there are cars coming from the opposite direction.",
    options: [
      { key: "A", text: "should" },
      { key: "B", text: "can" },
      { key: "C", text: "mustn’t" },
      { key: "D", text: "aren’t allowed to" }
    ],
    correctAnswerText: "mustn’t",
    originalCorrectKey: "C",
    translation: "Người ta không được phép quay đầu xe nếu có xe đang đi tới từ hướng ngược lại.",
    explanation: "<b>Động từ khiếm khuyết chỉ sự cấm đoán (Prohibition):</b><br>📌 <b>mustn't + V</b>: tuyệt đối không được phép làm gì (theo quy định pháp luật hoặc an toàn giao thông nghiêm ngặt).<br>📌 Lưu ý ngữ pháp: Đại từ bất định <i>'One'</i> (người ta/ai đó) là chủ ngữ ngôi thứ 3 số ít, nếu dùng 'be allowed to' thì động từ phải là 'isn't allowed to' (phương án D dùng 'aren't' là sai hòa hợp chủ vị).<br>👉 Do đó phương án chính xác nhất là: <b>mustn’t</b>."
  },
  {
    id: 4,
    originalNumber: 4,
    topic: "Reported Speech with Imperative (Câu gián tiếp dạng mệnh lệnh)",
    question: "The mother told her son _____ so impolitely.",
    options: [
      { key: "A", text: "not behave" },
      { key: "B", text: "not to behave" },
      { key: "C", text: "not behaving" },
      { key: "D", text: "did not behave" }
    ],
    correctAnswerText: "not to behave",
    originalCorrectKey: "B",
    translation: "Người mẹ bảo con trai mình không được cư xử bất lịch sự như vậy.",
    explanation: "<b>Câu gián tiếp dạng mệnh lệnh/khuyên bảo:</b><br>📌 Cấu trúc chuẩn: <b>tell somebody (not) to + V</b> (bảo ai làm / không làm việc gì).<br>📌 Ở dạng phủ định với động từ <i>'behave'</i>: <b>not to behave</b>.<br>👉 Do đó chọn: <b>not to behave</b>."
  },
  {
    id: 5,
    originalNumber: 5,
    topic: "Comparative of Adjectives (So sánh hơn của tính từ)",
    question: "It’s too noisy here. Can we go somewhere _____?",
    options: [
      { key: "A", text: "noisier" },
      { key: "B", text: "quietest" },
      { key: "C", text: "nosiest" },
      { key: "D", text: "quieter" }
    ],
    correctAnswerText: "quieter",
    originalCorrectKey: "D",
    translation: "Ở đây ồn ào quá. Chúng ta có thể đến một nơi nào đó yên tĩnh hơn không?",
    explanation: "<b>So sánh hơn của tính từ (Comparative):</b><br>📌 Ngữ cảnh: Nơi hiện tại quá ồn ào (<i>'too noisy'</i>), nên người nói mong muốn tìm một nơi <i>'yên tĩnh hơn'</i> so với nơi này -> dùng so sánh hơn.<br>📌 Tính từ <i>'quiet'</i> tuy có 2 âm tiết nhưng tận cùng bằng <i>-et</i>, thường chia so sánh hơn bằng cách thêm đuôi <i>-er</i>: <b>quieter</b>.<br>👉 Do đó chọn: <b>quieter</b>."
  },
  {
    id: 6,
    originalNumber: 6,
    topic: "Reduced Relative Clause: Passive (Rút gọn mệnh đề quan hệ bị động)",
    question: "I’m reading a book ________ by Shakespeare.",
    options: [
      { key: "A", text: "wrote" },
      { key: "B", text: "writes" },
      { key: "C", text: "was written" },
      { key: "D", text: "written" }
    ],
    correctAnswerText: "written",
    originalCorrectKey: "D",
    translation: "Tôi đang đọc một cuốn sách được viết bởi Shakespeare.",
    explanation: "<b>Rút gọn mệnh đề quan hệ dạng bị động (Past Participle):</b><br>📌 Mệnh đề gốc: <i>'I’m reading a book which was written by Shakespeare.'</i><br>📌 Vì mang nghĩa bị động (cuốn sách được viết bởi Shakespeare), ta lược bỏ đại từ quan hệ và trợ động từ to be, chỉ giữ lại quá khứ phân từ: <b>V-ed/V3</b> -> <b>written</b>.<br>👉 Do đó chọn: <b>written</b>."
  },
  {
    id: 7,
    originalNumber: 7,
    topic: "Modal Verbs: Obligation in the Past (Sự bắt buộc trong quá khứ)",
    question: "When we were in high school, we______ wear uniforms as it was a rule.",
    options: [
      { key: "A", text: "could" },
      { key: "B", text: "had to" },
      { key: "C", text: "must" },
      { key: "D", text: "are allowed to" }
    ],
    correctAnswerText: "had to",
    originalCorrectKey: "B",
    translation: "Khi chúng tôi còn học cấp ba, chúng tôi phải mặc đồng phục vì đó là quy định.",
    explanation: "<b>Sự bắt buộc trong quá khứ (Past Obligation):</b><br>📌 Dấu hiệu nhận biết: <i>'When we were in high school'</i> và <i>'as it was a rule'</i> xác định bối cảnh hoàn toàn diễn ra trong quá khứ.<br>📌 'must' không có dạng quá khứ, dạng quá khứ của 'must' để chỉ sự bắt buộc là <b>had to + V</b>.<br>👉 Do đó chọn: <b>had to</b>."
  },
  {
    id: 8,
    originalNumber: 8,
    topic: "Reported Speech: Tense Backshift (Lùi thì trong câu tường thuật)",
    question: "She said she _____ collect it for me after work.",
    options: [
      { key: "A", text: "would" },
      { key: "B", text: "did" },
      { key: "C", text: "must" },
      { key: "D", text: "had" }
    ],
    correctAnswerText: "would",
    originalCorrectKey: "A",
    translation: "Cô ấy nói rằng cô ấy sẽ đi lấy nó giúp tôi sau giờ làm việc.",
    explanation: "<b>Quy tắc lùi thì trong câu tường thuật (Reported Speech):</b><br>📌 Động từ tường thuật ở quá khứ: <i>'She said...'</i>.<br>📌 Lời nói trực tiếp ở thì tương lai đơn: <i>'I will collect it for you...'</i>.<br>📌 Khi chuyển sang gián tiếp, trợ động từ 'will' phải lùi thì thành <b>would</b>.<br>👉 Do đó chọn: <b>would</b>."
  },
  {
    id: 9,
    originalNumber: 9,
    topic: "Double Comparative (So sánh kép càng... càng...)",
    question: "The larger the apartment is, the _____ the rent is.",
    options: [
      { key: "A", text: "expensive" },
      { key: "B", text: "more expensive" },
      { key: "C", text: "expensively" },
      { key: "D", text: "most expensive" }
    ],
    correctAnswerText: "more expensive",
    originalCorrectKey: "B",
    translation: "Căn hộ càng rộng thì tiền thuê càng đắt.",
    explanation: "<b>So sánh kép (Double Comparative):</b><br>📌 Cấu trúc: <b>The + comparative + S + V, the + comparative + S + V</b> (Càng... càng...).<br>📌 Vế đầu dùng <i>'The larger'</i> (so sánh hơn). Vế thứ hai sau to be 'is' cần tính từ ở cấp so sánh hơn: 'expensive' là tính từ dài nên dạng so sánh hơn là <b>more expensive</b>.<br>👉 Do đó chọn: <b>more expensive</b>."
  },
  {
    id: 10,
    originalNumber: 10,
    topic: "Reduced Relative Clause with 'the first' (Rút gọn MĐQH sau số thứ tự)",
    question: "She was the first woman ________governor in the United States.",
    options: [
      { key: "A", text: "to be elected" },
      { key: "B", text: "was elected" },
      { key: "C", text: "to elect" },
      { key: "D", text: "who elected" }
    ],
    correctAnswerText: "to be elected",
    originalCorrectKey: "A",
    translation: "Bà là người phụ nữ đầu tiên được bầu làm thống đốc tại Hoa Kỳ.",
    explanation: "<b>Rút gọn mệnh đề quan hệ sau từ chỉ số thứ tự:</b><br>📌 Sau các từ như <i>the first, the second, the last, the only</i>..., mệnh đề quan hệ được rút gọn bằng <b>To-infinitive</b>.<br>📌 Mang nghĩa bị động (bà ấy được người dân bầu cử), cấu trúc là: <b>to be + V3/ed</b> -> <b>to be elected</b>.<br>👉 Do đó chọn: <b>to be elected</b>."
  },
  {
    id: 11,
    originalNumber: 11,
    topic: "Lack of Obligation in the Past (Không phải làm gì trong quá khứ)",
    question: "It started raining heavily, so I ______water the flowers.",
    options: [
      { key: "A", text: "need to" },
      { key: "B", text: "didn’t have to" },
      { key: "C", text: "need" },
      { key: "D", text: "mustn’t" }
    ],
    correctAnswerText: "didn’t have to",
    originalCorrectKey: "B",
    translation: "Trời bắt đầu mưa to nên tôi đã không phải tưới hoa.",
    explanation: "<b>Diễn tả việc không cần thiết/không phải làm trong quá khứ:</b><br>📌 Bối cảnh trong quá khứ: <i>'It started raining heavily'</i> (trời đã bắt đầu mưa to).<br>📌 Vì trời đã mưa to nên người nói không cần / không phải tưới hoa: cấu trúc <b>didn't have to + V</b> (đã không cần/không phải làm gì).<br>👉 Do đó chọn: <b>didn’t have to</b>."
  },
  {
    id: 12,
    originalNumber: 12,
    topic: "Reported Speech: Future with Be Going To (Tường thuật thì tương lai gần)",
    question: "Julia said that she _____ there at noon.",
    options: [
      { key: "A", text: "is going to be" },
      { key: "B", text: "can be" },
      { key: "C", text: "will be" },
      { key: "D", text: "was going to be" }
    ],
    correctAnswerText: "was going to be",
    originalCorrectKey: "D",
    translation: "Julia nói rằng cô ấy sẽ có mặt ở đó vào buổi trưa.",
    explanation: "<b>Lùi thì trong câu tường thuật (Reported Speech):</b><br>📌 Động từ tường thuật <i>'Julia said'</i> chia ở thì quá khứ đơn.<br>📌 Câu trực tiếp: <i>'I am going to be there at noon.'</i> Khi chuyển sang gián tiếp, 'is/am going to' phải lùi thì thành <b>was going to be</b>.<br>👉 Do đó chọn: <b>was going to be</b>."
  },
  {
    id: 13,
    originalNumber: 13,
    topic: "Double Comparative (So sánh kép càng... càng...)",
    question: "The faster we walk, _____we will get there.",
    options: [
      { key: "A", text: "the soonest" },
      { key: "B", text: "the soon" },
      { key: "C", text: "the more soon" },
      { key: "D", text: "the sooner" }
    ],
    correctAnswerText: "the sooner",
    originalCorrectKey: "D",
    translation: "Chúng ta đi bộ càng nhanh thì chúng ta sẽ đến nơi càng sớm.",
    explanation: "<b>Cấu trúc so sánh kép (Double Comparative):</b><br>📌 Công thức: <b>The + so sánh hơn, the + so sánh hơn</b>.<br>📌 Vế 1: <i>'The faster'</i> (so sánh hơn của fast).<br>📌 Vế 2: 'soon' là trạng từ ngắn, dạng so sánh hơn là <b>sooner</b> (không dùng 'the more soon' hay 'the soonest').<br>👉 Cụm hoàn chỉnh: <b>the sooner</b>.<br>👉 Do đó chọn: <b>the sooner</b>."
  },
  {
    id: 14,
    originalNumber: 14,
    topic: "Infinitive after 'the first' and 'the last' (Rút gọn MĐQH sau the first/the last)",
    question: "John is the first ________ and the last ________the office.",
    options: [
      { key: "A", text: "came / left" },
      { key: "B", text: "to come / to leave" },
      { key: "C", text: "come / leave" },
      { key: "D", text: "coming / leaving" }
    ],
    correctAnswerText: "to come / to leave",
    originalCorrectKey: "B",
    translation: "John là người đầu tiên đến và là người cuối cùng rời khỏi văn phòng.",
    explanation: "<b>Rút gọn mệnh đề sau 'the first' và 'the last':</b><br>📌 Quy tắc ngữ pháp: Sau các đại từ số thứ tự hoặc độc nhất như <i>the first, the second, the last, the only</i>, động từ đi kèm luôn ở dạng nguyên mẫu có to: <b>to-V</b>.<br>📌 Cả hai vế đều bổ nghĩa cho <i>the first</i> và <i>the last</i> nên đều dùng to-V: <b>to come / to leave</b>.<br>👉 Do đó chọn: <b>to come / to leave</b>."
  },
  {
    id: 15,
    originalNumber: 15,
    topic: "Modal Verbs: Logical Deduction (Suy đoán chắc chắn ở hiện tại)",
    question: "Ted’s flight from Amsterdam took more than 11 hours. He ______be exhausted after such a long flight.",
    options: [
      { key: "A", text: "must" },
      { key: "B", text: "can" },
      { key: "C", text: "need" },
      { key: "D", text: "will" }
    ],
    correctAnswerText: "must",
    originalCorrectKey: "A",
    translation: "Chuyến bay của Ted từ Amsterdam mất hơn 11 giờ đồng hồ. Anh ấy chắc hẳn rất kiệt sức sau một chuyến bay dài như vậy.",
    explanation: "<b>Suy đoán logic chắc chắn ở hiện tại (Logical Deduction):</b><br>📌 Căn cứ rõ ràng: chuyến bay kéo dài hơn 11 giờ (<i>'took more than 11 hours'</i>).<br>📌 Cấu trúc: <b>must + be/V</b> diễn tả sự suy đoán chắc chắn tới 90-95% dựa trên chứng cứ thực tế (chắc hẳn là/hẳn là).<br>👉 Do đó chọn: <b>must</b>."
  },
  {
    id: 16,
    originalNumber: 16,
    topic: "Reported Speech: Tense Backshift (Lùi thì trong câu tường thuật)",
    question: "She said I _____ an angel.",
    options: [
      { key: "A", text: "am" },
      { key: "B", text: "was" },
      { key: "C", text: "were" },
      { key: "D", text: "have been" }
    ],
    correctAnswerText: "was",
    originalCorrectKey: "B",
    translation: "Cô ấy nói rằng tôi là một thiên thần.",
    explanation: "<b>Lùi thì trong câu gián tiếp (Reported Speech):</b><br>📌 Động từ tường thuật <i>'She said'</i> ở thì quá khứ đơn.<br>📌 Câu trực tiếp: <i>'You are an angel.'</i><br>📌 Khi chuyển sang câu gián tiếp với chủ ngữ 'I', động từ to be ở hiện tại 'am/are' phải lùi thì thành <b>was</b>.<br>👉 Do đó chọn: <b>was</b>."
  },
  {
    id: 17,
    originalNumber: 17,
    topic: "Equal Comparison of Adverbs (So sánh bằng với trạng từ)",
    question: "She plays the piano_____ as she sings.",
    options: [
      { key: "A", text: "as beautifully" },
      { key: "B", text: "more beautifully" },
      { key: "C", text: "as beautiful" },
      { key: "D", text: "the most beautifully" }
    ],
    correctAnswerText: "as beautifully",
    originalCorrectKey: "A",
    translation: "Cô ấy chơi đàn piano hay như khi cô ấy hát.",
    explanation: "<b>So sánh bằng với trạng từ cách thức:</b><br>📌 Động từ <i>'plays'</i> (chơi đàn) là động từ hành động nên cần một trạng từ cách thức (adverb) để bổ nghĩa: <i>beautifully</i> (không dùng tính từ 'beautiful').<br>📌 Cấu trúc so sánh bằng: <b>as + adv + as</b> -> <b>as beautifully as</b>.<br>👉 Do đó chọn: <b>as beautifully</b>."
  },
  {
    id: 18,
    originalNumber: 18,
    topic: "Reduced Relative Clause: Passive (Rút gọn mệnh đề quan hệ bị động)",
    question: "They work in a hospital ________ by the government.",
    options: [
      { key: "A", text: "sponsors" },
      { key: "B", text: "sponsoring" },
      { key: "C", text: "to be sponsored" },
      { key: "D", text: "sponsored" }
    ],
    correctAnswerText: "sponsored",
    originalCorrectKey: "D",
    translation: "Họ làm việc trong một bệnh viện được tài trợ bởi chính phủ.",
    explanation: "<b>Rút gọn mệnh đề quan hệ dạng bị động (Past Participle):</b><br>📌 Câu gốc đầy đủ: <i>'They work in a hospital which is sponsored by the government.'</i><br>📌 Mang nghĩa bị động (bệnh viện được chính phủ tài trợ), ta lược bỏ đại từ quan hệ và to be, chỉ giữ lại quá khứ phân từ: <b>V-ed/V3</b> -> <b>sponsored</b>.<br>👉 Do đó chọn: <b>sponsored</b>."
  },
  {
    id: 19,
    originalNumber: 19,
    topic: "Prohibition: Be not allowed to (Diễn tả sự cấm đoán)",
    question: "You _____ smoke here as it’s strictly forbidden.",
    options: [
      { key: "A", text: "can" },
      { key: "B", text: "must" },
      { key: "C", text: "may" },
      { key: "D", text: "aren’t allowed to" }
    ],
    correctAnswerText: "aren’t allowed to",
    originalCorrectKey: "D",
    translation: "Bạn không được phép hút thuốc ở đây vì việc này bị nghiêm cấm.",
    explanation: "<b>Diễn tả sự cấm đoán (Prohibition):</b><br>📌 Dấu hiệu nhận biết: <i>'strictly forbidden'</i> (bị nghiêm cấm hoàn toàn).<br>📌 Cấu trúc: <b>be not allowed to + V</b> (không được phép làm gì). Với chủ ngữ 'You', dạng phủ định là <b>aren't allowed to</b>.<br>👉 Do đó chọn: <b>aren’t allowed to</b>."
  },
  {
    id: 20,
    originalNumber: 20,
    topic: "Reported Speech with Infinitive & Tense Backshift (Tường thuật kết hợp)",
    question: "I told him  _____ the word to Jane somehow that I to reach her during the early hours.",
    options: [
      { key: "A", text: "passing / will try" },
      { key: "B", text: "he will pass / tried" },
      { key: "C", text: "to pass / would be trying" },
      { key: "D", text: "he passed / have tried" }
    ],
    correctAnswerText: "to pass / would be trying",
    originalCorrectKey: "C",
    translation: "Tôi đã bảo anh ấy bằng cách nào đó hãy chuyển lời tới Jane rằng tôi sẽ cố gắng liên lạc với cô ấy vào những giờ đầu buổi sáng.",
    explanation: "<b>Cấu trúc câu tường thuật kết hợp:</b><br>📌 Vế 1: Cấu trúc <b>tell somebody + to-V</b> (bảo ai làm gì) -> <i>to pass</i>.<br>📌 Vế 2: Mệnh đề tường thuật lùi thì tương lai tiếp diễn từ 'will be trying' thành <b>would be trying</b>.<br>👉 Do đó chọn phương án: <b>to pass / would be trying</b>."
  },
  {
    id: 21,
    originalNumber: 21,
    topic: "Progressive Comparison (So sánh lũy tiến: càng ngày càng)",
    question: "The streets are getting more and _____these days.",
    options: [
      { key: "A", text: "crowded" },
      { key: "B", text: "less crowded" },
      { key: "C", text: "more crowded" },
      { key: "D", text: "most crowded" }
    ],
    correctAnswerText: "more crowded",
    originalCorrectKey: "C",
    translation: "Đường phố dạo này ngày càng trở nên đông đúc hơn.",
    explanation: "<b>So sánh càng ngày càng (Progressive Comparison):</b><br>📌 Cấu trúc so sánh lũy tiến với tính từ dài: <b>more and more + Adj</b>.<br>📌 Trong câu đã có sẵn <i>'more and'</i>, nên thành phần còn lại để hoàn chỉnh cụm từ là <b>more crowded</b> (ngày càng đông đúc).<br>👉 Do đó chọn: <b>more crowded</b>."
  },
  {
    id: 22,
    originalNumber: 22,
    topic: "Reduced Relative Clause: Location (Rút gọn mệnh đề quan hệ chỉ vị trí)",
    question: "He comes from a city ________ in the northern part of the country.",
    options: [
      { key: "A", text: "located" },
      { key: "B", text: "locating" },
      { key: "C", text: "to be located" },
      { key: "D", text: "locates" }
    ],
    correctAnswerText: "located",
    originalCorrectKey: "A",
    translation: "Anh ấy đến từ một thành phố nằm ở miền bắc của đất nước.",
    explanation: "<b>Rút gọn mệnh đề quan hệ dạng bị động/vị trí:</b><br>📌 Mệnh đề gốc: <i>'a city which is located in...'</i> (thành phố được tọa lạc / nằm ở...).<br>📌 Rút gọn giữ lại quá khứ phân từ: <b>V-ed/V3</b> -> <b>located</b>.<br>👉 Do đó chọn: <b>located</b>."
  },
  {
    id: 23,
    originalNumber: 23,
    topic: "Polite Offers / Invitations (Lời mời, đề nghị lịch sự)",
    question: "_____ you like to go by train?",
    options: [
      { key: "A", text: "Would" },
      { key: "B", text: "Could" },
      { key: "C", text: "Must" },
      { key: "D", text: "Should" }
    ],
    correctAnswerText: "Would",
    originalCorrectKey: "A",
    translation: "Bạn có muốn đi bằng tàu hỏa không?",
    explanation: "<b>Cấu trúc lời mời/đề nghị lịch sự:</b><br>📌 Công thức chuẩn trong tiếng Anh: <b>Would you like + to-V...?</b> (Bạn có thích/muốn làm việc gì đó không?).<br>👉 Do đó chọn: <b>Would</b>."
  },
  {
    id: 24,
    originalNumber: 24,
    topic: "Reported Yes/No Question (Câu hỏi gián tiếp Yes/No)",
    question: "John asked me _____ interested in any kind of sports.",
    options: [
      { key: "A", text: "ifIwere" },
      { key: "B", text: "if wereI" },
      { key: "C", text: "if wasI" },
      { key: "D", text: "if Iwas" }
    ],
    correctAnswerText: "if Iwas",
    originalCorrectKey: "D",
    translation: "John đã hỏi tôi liệu tôi có quan tâm đến môn thể thao nào không.",
    explanation: "<b>Câu hỏi gián tiếp (Reported Yes/No Questions):</b><br>📌 Cấu trúc: <b>S + asked + (O) + if/whether + S + V</b>.<br>📌 Trong câu gián tiếp, không được đảo trợ động từ lên trước chủ ngữ. Chủ ngữ 'I' đứng trước động từ to be quá khứ 'was': <b>if I was</b>.<br>👉 Do đó chọn: <b>if Iwas</b>."
  },
  {
    id: 25,
    originalNumber: 25,
    topic: "Equal Comparison with Adverbs (So sánh bằng với trạng từ)",
    question: "You must explain your problems_____.",
    options: [
      { key: "A", text: "as clear as you can" },
      { key: "B", text: "as clearly as you can" },
      { key: "C", text: "as clear than you are" },
      { key: "D", text: "as clearly as you are" }
    ],
    correctAnswerText: "as clearly as you can",
    originalCorrectKey: "B",
    translation: "Bạn phải giải thích các vấn đề của mình một cách rõ ràng nhất có thể.",
    explanation: "<b>So sánh bằng bổ nghĩa cho động từ:</b><br>📌 Động từ <i>'explain'</i> (giải thích) là động từ hành động, đòi hỏi trạng từ cách thức <b>clearly</b> (không dùng tính từ 'clear').<br>📌 Cấu trúc so sánh bằng chỉ khả năng: <b>as + adv + as + S + can</b> (rõ ràng nhất có thể).<br>👉 Do đó chọn: <b>as clearly as you can</b>."
  },
  {
    id: 26,
    originalNumber: 26,
    topic: "Reduction to Infinitive of Purpose (Rút gọn sang cụm chỉ mục đích)",
    question: "He took me to an expensive restaurant where we enjoyed a good meal.",
    options: [
      { key: "A", text: "enjoyed a good meal." },
      { key: "B", text: "to enjoy a good meal." },
      { key: "C", text: "and enjoying a good meal." },
      { key: "D", text: "we enjoyed a good meal in." }
    ],
    correctAnswerText: "to enjoy a good meal.",
    originalCorrectKey: "B",
    translation: "Anh ấy đã đưa tôi đến một nhà hàng đắt tiền để thưởng thức một bữa ăn ngon.",
    explanation: "<b>Rút gọn mệnh đề chỉ mục đích bằng To-infinitive:</b><br>📌 Mục đích của hành động đưa đến nhà hàng là để ăn bữa ngon.<br>📌 Mệnh đề <i>'where we enjoyed a good meal'</i> có thể được rút gọn ngắn gọn và chuẩn xác bằng cụm động từ nguyên mẫu chỉ mục đích: <b>to enjoy a good meal</b>.<br>👉 Do đó chọn: <b>to enjoy a good meal.</b>"
  },
  {
    id: 27,
    originalNumber: 27,
    topic: "Modal Verbs: Polite Requests (Đưa ra lời yêu cầu lịch sự)",
    question: "_____ you turn it down a bit, please?",
    options: [
      { key: "A", text: "Should" },
      { key: "B", text: "Can" },
      { key: "C", text: "Will" },
      { key: "D", text: "Might" }
    ],
    correctAnswerText: "Can",
    originalCorrectKey: "B",
    translation: "Bạn có thể vặn nhỏ âm lượng lại một chút được không, làm ơn?",
    explanation: "<b>Đưa ra lời yêu cầu lịch sự (Polite Requests):</b><br>📌 Cấu trúc yêu cầu thông dụng và chuẩn mực: <b>Can / Could you + V + ..., please?</b> (Bạn có thể vui lòng... được không?).<br>👉 Do đó chọn: <b>Can</b>."
  },
  {
    id: 28,
    originalNumber: 28,
    topic: "Reported Speech: Tense and Time Changes (Biến đổi thì và thời gian)",
    question: "Emily said that her teacher  _____ to London.",
    options: [
      { key: "A", text: "will go / tomorrow" },
      { key: "B", text: "went / tomorrow" },
      { key: "C", text: "would go / the next day" },
      { key: "D", text: "had gone / the next day" }
    ],
    correctAnswerText: "would go / the next day",
    originalCorrectKey: "C",
    translation: "Emily nói rằng giáo viên của cô ấy sẽ đi London vào ngày hôm sau.",
    explanation: "<b>Quy tắc chuyển đổi trong câu tường thuật gián tiếp:</b><br>📌 Động từ tường thuật <i>'Emily said'</i> ở thì quá khứ đơn.<br>📌 Thì tương lai đơn 'will go' lùi thì thành <b>would go</b>.<br>📌 Trạng từ chỉ thời gian 'tomorrow' (ngày mai) chuyển thành <b>the next day</b> (hoặc the following day).<br>👉 Do đó phương án chính xác là: <b>would go / the next day</b>."
  },
  {
    id: 29,
    originalNumber: 29,
    topic: "Irregular Comparative Adverb (So sánh hơn bất quy tắc của trạng từ)",
    question: "Tom plays tennis_____ than Peter.",
    options: [
      { key: "A", text: "badly" },
      { key: "B", text: "worse" },
      { key: "C", text: "more badly" },
      { key: "D", text: "the worst" }
    ],
    correctAnswerText: "worse",
    originalCorrectKey: "B",
    translation: "Tom chơi quần vợt dở hơn Peter.",
    explanation: "<b>So sánh hơn bất quy tắc của trạng từ:</b><br>📌 Trạng từ <i>'badly'</i> (dở, tệ) có dạng so sánh hơn bất quy tắc là <b>worse</b> (không dùng 'more badly').<br>📌 Dấu hiệu nhận biết: từ <b>than</b> -> <i>worse than</i>.<br>👉 Do đó chọn: <b>worse</b>."
  },
  {
    id: 30,
    originalNumber: 30,
    topic: "Reduced Relative Clause with To-infinitive (Rút gọn mệnh đề quan hệ với To-V)",
    question: "We have a lot of things that we have to do today.",
    options: [
      { key: "A", text: "doing" },
      { key: "B", text: "to do" },
      { key: "C", text: "done" },
      { key: "D", text: "do" }
    ],
    correctAnswerText: "to do",
    originalCorrectKey: "B",
    translation: "Chúng tôi có rất nhiều việc phải làm hôm nay.",
    explanation: "<b>Rút gọn mệnh đề quan hệ diễn tả bổn phận/mục đích:</b><br>📌 Mệnh đề <i>'things that we have to do'</i> diễn tả những việc bắt buộc/cần phải làm, được rút gọn chuẩn xác bằng động từ nguyên mẫu có to: <b>things to do</b>.<br>👉 Do đó chọn: <b>to do</b>."
  },
  {
    id: 31,
    originalNumber: 31,
    topic: "Modal Verbs: Prohibition (Quy định cấm đoán)",
    question: "You_____smoke in the cinema.",
    options: [
      { key: "A", text: "can" },
      { key: "B", text: "could" },
      { key: "C", text: "can’t" },
      { key: "D", text: "will" }
    ],
    correctAnswerText: "can’t",
    originalCorrectKey: "C",
    translation: "Bạn không được hút thuốc trong rạp chiếu phim.",
    explanation: "<b>Diễn tả sự cấm đoán theo nội quy (Prohibition):</b><br>📌 <b>can't + V</b> được sử dụng phổ biến trong ngữ cảnh hàng ngày để chỉ hành động không được phép làm theo quy định ở những nơi công cộng như rạp chiếu phim.<br>👉 Do đó chọn: <b>can’t</b>."
  },
  {
    id: 32,
    originalNumber: 32,
    topic: "Reported Negative Imperative (Tường thuật câu mệnh lệnh phủ định)",
    question: "She told the boys _____on the grass.",
    options: [
      { key: "A", text: "do not play" },
      { key: "B", text: "did not play" },
      { key: "C", text: "not playing" },
      { key: "D", text: "not to play" }
    ],
    correctAnswerText: "not to play",
    originalCorrectKey: "D",
    translation: "Cô ấy bảo các cậu bé không được chơi đùa trên bãi cỏ.",
    explanation: "<b>Câu tường thuật mệnh lệnh phủ định:</b><br>📌 Cấu trúc chuẩn: <b>tell somebody + not to + V</b> (bảo/nhắc ai đừng làm gì).<br>👉 Điền: <b>not to play</b>.<br>👉 Do đó chọn: <b>not to play</b>."
  },
  {
    id: 33,
    originalNumber: 33,
    topic: "Comparative of Long Adjectives (So sánh hơn của tính từ dài)",
    question: "Mr. Brown’s car is _____ than Dick’s.",
    options: [
      { key: "A", text: "more comfortable" },
      { key: "B", text: "the most comfortable" },
      { key: "C", text: "comfortable" },
      { key: "D", text: "least comfortable" }
    ],
    correctAnswerText: "more comfortable",
    originalCorrectKey: "A",
    translation: "Chiếc xe ô tô của ông Brown tiện nghi hơn xe của Dick.",
    explanation: "<b>So sánh hơn với tính từ dài:</b><br>📌 Dấu hiệu nhận biết: từ so sánh <b>than</b>.<br>📌 <i>'comfortable'</i> là tính từ dài (3 âm tiết), cấu trúc so sánh hơn là: <b>more + Adj + than</b> -> <b>more comfortable</b>.<br>👉 Do đó chọn: <b>more comfortable</b>."
  },
  {
    id: 34,
    originalNumber: 34,
    topic: "Reduced Relative Clause: Active (Rút gọn mệnh đề quan hệ chủ động)",
    question: "The young man who lives next door is very kind to my family.",
    options: [
      { key: "A", text: "to live next door" },
      { key: "B", text: "he lives next door" },
      { key: "C", text: "living next door" },
      { key: "D", text: "lived next door" }
    ],
    correctAnswerText: "living next door",
    originalCorrectKey: "C",
    translation: "Chàng trai trẻ sống ở nhà bên cạnh rất tốt bụng với gia đình tôi.",
    explanation: "<b>Rút gọn mệnh đề quan hệ dạng chủ động (Present Participle):</b><br>📌 Mệnh đề gốc: <i>'who lives next door'</i> (mang nghĩa chủ động: chàng trai sống ở đó).<br>📌 Rút gọn bằng hiện tại phân từ: <b>V-ing</b> -> <b>living next door</b>.<br>👉 Do đó chọn: <b>living next door</b>."
  },
  {
    id: 35,
    originalNumber: 35,
    topic: "Present Perfect with Since (Thì hiện tại hoàn thành với Since)",
    question: "Since he bought the new car, he _____sleep.",
    options: [
      { key: "A", text: "mustn’t" },
      { key: "B", text: "cannot" },
      { key: "C", text: "couldn’t" },
      { key: "D", text: "has not been able to" }
    ],
    correctAnswerText: "has not been able to",
    originalCorrectKey: "D",
    translation: "Kể từ khi mua chiếc ô tô mới, anh ấy đã không thể nào ngủ được.",
    explanation: "<b>Hòa hợp thì với liên từ Since:</b><br>📌 Cấu trúc: <b>Since + S + V (quá khứ đơn), S + Present Perfect (hiện tại hoàn thành)</b>.<br>📌 Động từ chỉ năng lực 'can' không có dạng phân từ 3, nên ở thì hiện tại hoàn thành được thay thế bằng: <b>has/have not been able to + V</b>.<br>👉 Do đó chọn: <b>has not been able to</b>."
  },
  {
    id: 36,
    originalNumber: 36,
    topic: "Reported Wh-Questions (Câu hỏi gián tiếp có từ để hỏi)",
    question: "She asked _____.",
    options: [
      { key: "A", text: "where was her umbrella" },
      { key: "B", text: "where her umbrella was" },
      { key: "C", text: "where were her umbrella" },
      { key: "D", text: "where her umbrella were" }
    ],
    correctAnswerText: "where her umbrella was",
    originalCorrectKey: "B",
    translation: "Cô ấy đã hỏi chiếc ô của mình đang ở đâu.",
    explanation: "<b>Trật tự từ trong câu hỏi gián tiếp:</b><br>📌 Cấu trúc: <b>S + asked + Wh-word + S + V</b> (không đảo trợ động từ to be lên trước chủ ngữ).<br>📌 Chủ ngữ <i>'her umbrella'</i> là danh từ số ít nên đi với to be số ít <b>was</b>: <b>where her umbrella was</b>.<br>👉 Do đó chọn: <b>where her umbrella was</b>."
  },
  {
    id: 37,
    originalNumber: 37,
    topic: "Multiple Comparison (So sánh bội số: gấp hai, ba lần)",
    question: "Though he earns _____ much money as I do, he always says he runs short of money.",
    options: [
      { key: "A", text: "as twice" },
      { key: "B", text: "twice as" },
      { key: "C", text: "so twice" },
      { key: "D", text: "twice so" }
    ],
    correctAnswerText: "twice as",
    originalCorrectKey: "B",
    translation: "Mặc dù anh ấy kiếm được số tiền nhiều gấp đôi tôi, anh ấy luôn miệng nói mình bị thiếu tiền.",
    explanation: "<b>So sánh bội số (Multiple Numbers Comparison):</b><br>📌 Cấu trúc: <b>S + V + multiple number (half / twice / three times...) + as + much/many + N + as...</b><br>📌 Từ chỉ số lần <i>'twice'</i> (gấp 2 lần) phải đứng TRƯỚC cụm <i>'as much money as'</i>: <b>twice as</b>.<br>👉 Do đó chọn: <b>twice as</b>."
  },
  {
    id: 38,
    originalNumber: 38,
    topic: "Negative Reduced Relative Clause (Rút gọn mệnh đề quan hệ phủ định)",
    question: "The people that did not exercise every day lost the least weight.",
    options: [
      { key: "A", text: "not exercising" },
      { key: "B", text: "not exercised" },
      { key: "C", text: "do not exercising" },
      { key: "D", text: "did not exercising" }
    ],
    correctAnswerText: "not exercising",
    originalCorrectKey: "A",
    translation: "Những người không tập thể dục mỗi ngày giảm được ít cân nhất.",
    explanation: "<b>Rút gọn mệnh đề quan hệ phủ định dạng chủ động:</b><br>📌 Mệnh đề gốc: <i>'that did not exercise every day'</i>.<br>📌 Quy tắc rút gọn mệnh đề phủ định chủ động: <b>not + V-ing</b> -> <b>not exercising every day</b>.<br>👉 Do đó chọn: <b>not exercising</b>."
  },
  {
    id: 39,
    originalNumber: 39,
    topic: "Modal Verbs: Obligation in the Past (Sự bắt buộc trong quá khứ)",
    question: "She_____stay at school yesterday afternoon to discuss the project with her teacher.",
    options: [
      { key: "A", text: "must" },
      { key: "B", text: "could" },
      { key: "C", text: "had to" },
      { key: "D", text: "will" }
    ],
    correctAnswerText: "had to",
    originalCorrectKey: "C",
    translation: "Cô ấy đã phải ở lại trường vào chiều hôm qua để thảo luận về dự án với giáo viên của mình.",
    explanation: "<b>Diễn tả sự bắt buộc trong quá khứ (Past Obligation):</b><br>📌 Dấu hiệu thời gian: <b>yesterday afternoon</b> (chiều hôm qua) thuộc quá khứ.<br>📌 Diễn tả sự bắt buộc phải làm việc gì trong quá khứ ta dùng <b>had to + V</b> (dạng quá khứ của 'must' và 'have to').<br>👉 Do đó chọn: <b>had to</b>."
  },
  {
    id: 40,
    originalNumber: 40,
    topic: "Reported Wh-Question with Tense Backshift (Câu hỏi gián tiếp và lùi thì)",
    question: "The mother asked her son_____.",
    options: [
      { key: "A", text: "where he has been" },
      { key: "B", text: "where he had been" },
      { key: "C", text: "where has he been" },
      { key: "D", text: "where had he been" }
    ],
    correctAnswerText: "where he had been",
    originalCorrectKey: "B",
    translation: "Người mẹ đã hỏi con trai mình đã ở đâu.",
    explanation: "<b>Câu hỏi gián tiếp có từ để hỏi kết hợp lùi thì:</b><br>📌 Cấu trúc: <b>S + asked + Wh-word + S + V</b> (không đảo trợ động từ lên trước chủ ngữ 'he', loại phương án C và D).<br>📌 Động từ tường thuật <i>'asked'</i> ở thì quá khứ, câu trực tiếp ('Where have you been?' hoặc 'Where were you?') khi lùi thì chuyển thành thì quá khứ hoàn thành: <b>had been</b> (loại A).<br>👉 Do đó phương án chính xác là: <b>where he had been</b>."
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { REVISION_40_QUESTIONS };
}
