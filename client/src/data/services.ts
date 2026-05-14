export interface ServiceIncludeGroup {
  title: string;
  items: string[];
}

export interface ServiceData {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  unit: string;
  sku: string;
  image?: string;
  highlights: string[];
  problems: string[];
  problemNote: string;
  serviceIncludes: ServiceIncludeGroup[];
  serviceNote?: string;
  benefits: { title: string; description: string }[];
  benefitNote?: string;
  process: { title: string; desc: string }[];
  processNote?: string;
  processTime?: string;
  targetAudience: string[];
  faq: { q: string; a: string }[];
  commitments?: { title: string; description: string }[];
  documents?: { title: string; description?: string }[];
  comparison?: boolean;
}

export const services: ServiceData[] = [
  // 1. Giải thể doanh nghiệp
  {
    slug: "giai-the-doanh-nghiep",
    title: "Dịch Vụ Giải Thể Doanh Nghiệp",
    subtitle: "Nhanh chóng – Đúng pháp luật – An tâm hoàn tất nghĩa vụ",
    description: "Giải thể doanh nghiệp là bước quan trọng khi bạn quyết định ngừng hoạt động kinh doanh, nhưng quy trình pháp lý và thuế lại phức tạp, dễ phát sinh rủi ro nếu không nắm rõ.\n\nDịch vụ Giải thể doanh nghiệp của chúng tôi giúp bạn thực hiện toàn bộ thủ tục pháp lý – kế toán – thuế một cách nhanh gọn, minh bạch và tuân thủ luật định, để bạn yên tâm hoàn tất mọi nghĩa vụ và tập trung cho kế hoạch mới.",
    price: "Liên hệ",
    unit: "",
    sku: "GT-DN-01",
    image: "https://images.pexels.com/photos/7643745/pexels-photo-7643745.jpeg?auto=compress&cs=tinysrgb&w=1200",
    highlights: [
      "Nhanh chóng – chính xác, không mất thời gian tìm hiểu thủ tục",
      "Tuân thủ pháp luật, đúng trình tự với cơ quan thuế và đăng ký kinh doanh",
      "Tối ưu nghĩa vụ thuế và xử lý triệt để các khoản còn tồn",
      "Hỗ trợ trọn gói từ chuẩn bị hồ sơ đến nhận giấy chứng nhận giải thể"
    ],
    problems: [
      "Không nắm rõ quy trình pháp lý, thủ tục phức tạp",
      "Hồ sơ kế toán chưa hoàn chỉnh, thiếu chứng từ",
      "Lo ngại bị truy thu thuế, phạt chậm nộp",
      "Phải làm việc với nhiều cơ quan: Thuế, Sở KHĐT…",
      "Tốn nhiều thời gian đi lại, bổ sung hồ sơ nhiều lần"
    ],
    problemNote: "Thực tế, rất nhiều doanh nghiệp bị \"treo\" nhiều năm chỉ vì không xử lý dứt điểm thủ tục giải thể.",
    serviceIncludes: [
      {
        title: "Tư vấn và chuẩn bị hồ sơ giải thể",
        items: [
          "Tư vấn điều kiện pháp lý để giải thể doanh nghiệp.",
          "Chuẩn bị hồ sơ cần thiết gửi cơ quan đăng ký kinh doanh và cơ quan thuế.",
          "Hướng dẫn doanh nghiệp hoàn tất các nghĩa vụ còn tồn (nếu có)."
        ]
      },
      {
        title: "Rà soát sổ sách kế toán & nghĩa vụ thuế",
        items: [
          "Kiểm tra toàn bộ sổ sách kế toán, báo cáo thuế, hóa đơn còn tồn.",
          "Lập báo cáo quyết toán thuế cuối cùng (TNDN, GTGT, TNCN).",
          "Tư vấn phương án xử lý các khoản nợ, công nợ, chi phí còn lại."
        ]
      },
      {
        title: "Thực hiện thủ tục giải thể",
        items: [
          "Nộp hồ sơ giải thể tại Sở Kế hoạch & Đầu tư.",
          "Thực hiện thủ tục thông báo công khai giải thể theo quy định.",
          "Theo dõi tiến trình và nhận Giấy chứng nhận giải thể từ cơ quan có thẩm quyền."
        ]
      },
      {
        title: "Hỗ trợ xử lý sau giải thể",
        items: [
          "Hỗ trợ lưu trữ hồ sơ kế toán theo quy định.",
          "Tư vấn các vấn đề pháp lý hoặc thuế phát sinh sau khi giải thể."
        ]
      }
    ],
    serviceNote: "Bạn không cần trực tiếp đi lại với nhiều cơ quan – chúng tôi xử lý A đến Z",
    benefits: [
      { title: "Nhanh chóng – chính xác", description: "Không phải mất nhiều thời gian tìm hiểu thủ tục rắc rối. Chúng tôi nắm rõ quy trình giải thể từ khóa mã số thuế đến chấm dứt pháp nhân, giúp hồ sơ được xử lý nhanh ngay từ lần nộp đầu tiên." },
      { title: "Tuân thủ pháp luật", description: "Giải thể đúng trình tự, tránh rủi ro với cơ quan thuế và pháp luật. Chúng tôi cập nhật quy định mới nhất và đảm bảo mọi bước đều đúng quy định hiện hành." },
      { title: "Tối ưu nghĩa vụ thuế", description: "Xử lý triệt để các khoản thuế, chi phí còn tồn. Rà soát hồ sơ, phát hiện sai sót và xử lý kịp thời giúp giảm thiểu nguy cơ bị truy thu hoặc xử phạt." },
      { title: "Tiết kiệm chi phí và công sức", description: "Không phải tự đi lại, theo dõi hồ sơ hay giải quyết phát sinh. Chúng tôi đại diện làm việc với Sở KHĐT, cơ quan thuế và các bên liên quan." },
      { title: "Hỗ trợ trọn gói", description: "Từ chuẩn bị hồ sơ đến nhận Giấy chứng nhận giải thể, kèm tư vấn pháp lý và thuế phát sinh sau giải thể. Bạn yên tâm hoàn tất mọi nghĩa vụ trong một lần ủy quyền." },
      { title: "Bảo mật tuyệt đối thông tin", description: "Toàn bộ thông tin tài chính, hồ sơ và tình trạng doanh nghiệp được bảo mật nghiêm ngặt. Chúng tôi cam kết không chia sẻ với bên thứ ba khi chưa có sự đồng ý." }
    ],
    process: [
      { title: "Tiếp nhận thông tin doanh nghiệp", desc: "Thu thập hồ sơ, thông tin doanh nghiệp cần giải thể." },
      { title: "Kiểm tra tình trạng thuế, hồ sơ", desc: "Rà soát toàn bộ sổ sách, báo cáo thuế, hóa đơn." },
      { title: "Tư vấn phương án & báo giá chi tiết", desc: "Đề xuất phương án xử lý phù hợp và báo giá minh bạch." },
      { title: "Tiến hành thủ tục giải thể", desc: "Nộp hồ sơ, làm việc với cơ quan thuế và Sở KHĐT." },
      { title: "Bàn giao kết quả hoàn tất", desc: "Bàn giao Giấy chứng nhận giải thể và hồ sơ hoàn chỉnh." }
    ],
    processTime: "30 – 60 ngày (tùy tình trạng hồ sơ)",
    targetAudience: [
      "Doanh nghiệp muốn ngừng hoạt động kinh doanh và giải thể hoàn toàn",
      "Doanh nghiệp tạm dừng hoạt động lâu nhưng muốn xử lý pháp lý và thuế gọn gàng",
      "Chủ doanh nghiệp muốn nhanh chóng hoàn tất nghĩa vụ pháp lý, thuế và sổ sách mà không mất thời gian tự thực hiện"
    ],
    faq: [
      { q: "Không phát sinh doanh thu có cần giải thể không?", a: "Doanh nghiệp không phát sinh doanh thu thì không bắt buộc phải giải thể. Tuy nhiên, vẫn phải thực hiện đầy đủ nghĩa vụ kê khai thuế và báo cáo theo quy định, kể cả tờ khai \"0 đồng\". Trường hợp không còn nhu cầu hoạt động, doanh nghiệp có thể cân nhắc tạm ngừng kinh doanh hoặc giải thể để tránh phát sinh chi phí và rủi ro." },
      { q: "Công ty chưa quyết toán thuế có giải thể được không?", a: "Doanh nghiệp chưa hoàn tất quyết toán thuế thì không thể thực hiện giải thể theo quy định. Trước khi giải thể, công ty bắt buộc phải hoàn thành toàn bộ nghĩa vụ thuế và được cơ quan thuế xác nhận không còn nợ thuế. Hãy để chúng tôi giúp bạn." },
      { q: "Thời gian giải thể bao lâu?", a: "Thông thường từ 1 – 2 tháng, tùy vào tình trạng hồ sơ và việc hoàn tất nghĩa vụ thuế. Trường hợp hồ sơ đầy đủ, không phát sinh vướng mắc thì có thể xử lý nhanh hơn." },
      { q: "Chi phí dịch vụ được tính như thế nào?", a: "Chi phí dịch vụ thường được tính dựa trên tình trạng hồ sơ, quy mô doanh nghiệp và mức độ phức tạp của từng trường hợp. Doanh nghiệp nên cung cấp thông tin cụ thể để được báo giá chi tiết và minh bạch." }
    ]
  },

  // 2. Báo cáo thuế (Kê khai thuế)
  {
    slug: "ke-khai-thue",
    title: "Dịch Vụ Báo Cáo Thuế",
    subtitle: "Chính xác – Đúng hạn – Không lo sai sót",
    description: "Bạn đang cần một đơn vị báo cáo thuế nhanh – chuẩn – đúng luật cho doanh nghiệp?\n\nChúng tôi cung cấp dịch vụ báo cáo thuế chuyên nghiệp giúp bạn yên tâm mỗi kỳ kê khai, không phải lo rủi ro hay sai sót với cơ quan thuế.",
    price: "Liên hệ",
    unit: "",
    sku: "KK-TH-01",
    image: "https://images.pexels.com/photos/7643795/pexels-photo-7643795.jpeg?auto=compress&cs=tinysrgb&w=1200",
    highlights: [
      "Đúng hạn – đúng luật, không còn lo quên kỳ báo cáo",
      "Hạn chế tối đa rủi ro thuế – sai sót nhỏ không thành chi phí lớn",
      "Tiết kiệm chi phí so với tuyển kế toán thuế chuyên trách",
      "Tư vấn kịp thời mỗi khi có phát sinh bất thường"
    ],
    problems: [
      "Không nắm rõ quy định thuế thay đổi liên tục",
      "Sai sót khi kê khai dẫn đến bị phạt hành chính",
      "Quên hạn nộp tờ khai, nộp thuế chậm",
      "Không có kế toán chuyên môn sâu",
      "Dữ liệu hóa đơn, chứng từ không được kiểm soát tốt"
    ],
    problemNote: "Chỉ một sai sót nhỏ cũng có thể khiến doanh nghiệp bị truy thu và mất nhiều thời gian xử lý.",
    serviceIncludes: [
      {
        title: "Kê khai thuế GTGT hàng tháng/quý",
        items: [
          "Kiểm tra hóa đơn đầu vào – đầu ra",
          "Rà soát tính hợp lệ của chứng từ",
          "Lập và nộp tờ khai GTGT đúng hạn",
          "Cân đối doanh thu – chi phí hợp lý"
        ]
      },
      {
        title: "Kê khai thuế TNCN hàng tháng/quý",
        items: [
          "Theo dõi thu nhập từng nhân sự",
          "Tính thuế TNCN phải nộp",
          "Lập tờ khai và gửi qua hệ thống thuế",
          "Tư vấn các trường hợp miễn giảm thuế"
        ]
      },
      {
        title: "Kê khai thuế TNDN tạm tính theo quý",
        items: [
          "Tính toán lợi nhuận dự kiến",
          "Dự tính số thuế TNDN phải nộp",
          "Tư vấn tối ưu chi phí hợp lệ"
        ]
      }
    ],
    benefits: [
      { title: "Đúng hạn – đúng luật", description: "Không còn lo quên kỳ báo cáo. Chúng tôi chủ động theo dõi lịch nộp tờ khai và nhắc trước mỗi kỳ kê khai để đảm bảo doanh nghiệp luôn tuân thủ đúng thời hạn." },
      { title: "Hạn chế tối đa rủi ro thuế", description: "Sai sót nhỏ trong kê khai có thể trở thành chi phí lớn nếu bị truy thu. Chúng tôi rà soát kỹ số liệu, đối chiếu chứng từ trước khi nộp để giảm thiểu rủi ro phát sinh." },
      { title: "Tiết kiệm chi phí", description: "Không cần tuyển kế toán thuế riêng với chi phí cố định hàng tháng. Bạn chỉ trả phí dịch vụ phù hợp với quy mô và nhu cầu thực tế của doanh nghiệp." },
      { title: "Tư vấn kịp thời", description: "Nếu có phát sinh bất thường, chúng tôi sẽ báo ngay và đề xuất phương án xử lý. Bạn được giải đáp nhanh chóng mọi thắc mắc về thuế trong suốt kỳ làm việc." },
      { title: "Tiện lợi – nhanh chóng", description: "Bạn chỉ cần gửi chứng từ, mọi thứ còn lại để chúng tôi lo. Quy trình tiếp nhận – xử lý – nộp tờ khai được tối ưu để bạn tập trung vào hoạt động kinh doanh chính." },
      { title: "Cập nhật quy định mới nhất", description: "Chính sách thuế thường xuyên thay đổi và dễ gây nhầm lẫn. Đội ngũ liên tục cập nhật và áp dụng quy định mới vào quá trình kê khai cho khách hàng." }
    ],
    benefitNote: "Kinh nghiệm thực tế đa ngành nghề, làm việc nhanh gọn, báo cáo minh bạch, không phát sinh phí ngoài báo giá.",
    process: [
      { title: "Tiếp nhận chứng từ, hóa đơn", desc: "Thu thập hóa đơn, chứng từ phát sinh trong kỳ." },
      { title: "Kiểm tra và rà soát dữ liệu", desc: "Đối chiếu số liệu, kiểm tra tính hợp lệ." },
      { title: "Lập tờ khai thuế", desc: "Lập tờ khai GTGT, TNCN, TNDN theo quy định." },
      { title: "Gửi khách hàng kiểm tra", desc: "Gửi kết quả để khách hàng xác nhận (nếu cần)." },
      { title: "Nộp tờ khai và báo cáo đúng hạn", desc: "Nộp báo cáo qua hệ thống thuế điện tử." }
    ],
    processNote: "Cam kết nhắc hạn trước mỗi kỳ kê khai",
    targetAudience: [
      "Doanh nghiệp mới thành lập",
      "Doanh nghiệp nhỏ và vừa",
      "Doanh nghiệp không có kế toán thuế chuyên trách",
      "Doanh nghiệp muốn thuê ngoài để giảm chi phí vận hành"
    ],
    faq: [
      { q: "Không phát sinh hóa đơn có cần kê khai thuế không?", a: "Doanh nghiệp không phát sinh hóa đơn vẫn bắt buộc phải kê khai thuế theo quy định. Trường hợp không có hoạt động kinh doanh, doanh nghiệp sẽ nộp tờ khai \"0 đồng\" đúng hạn. Việc không kê khai dù không phát sinh vẫn có thể bị xử phạt hành chính." },
      { q: "Kê khai sai có sửa được không?", a: "Có, doanh nghiệp hoàn toàn có thể kê khai bổ sung khi phát hiện sai sót trong hồ sơ thuế. Việc điều chỉnh cần thực hiện sớm để hạn chế rủi ro bị xử phạt hoặc truy thu thuế." },
      { q: "Dịch vụ có bao gồm nộp thuế không?", a: "Có, dịch vụ của chúng tôi bao gồm việc lập tờ khai và hỗ trợ nộp thuế thay cho doanh nghiệp theo quy định. Tuy nhiên, tiền thuế phát sinh sẽ do doanh nghiệp trực tiếp chi trả vào ngân sách nhà nước." },
      { q: "Bao lâu phải kê khai thuế?", a: "Doanh nghiệp thường thực hiện kê khai thuế theo quý, bao gồm thuế GTGT và TNCN (nếu có phát sinh). Một số trường hợp đặc biệt có thể kê khai theo tháng tùy quy mô và doanh thu. Ngoài ra, cuối năm doanh nghiệp phải thực hiện quyết toán thuế theo quy định." }
    ]
  },

  // 3. Kế toán trọn gói
  {
    slug: "ke-toan-tron-goi",
    title: "Dịch Vụ Kế Toán Chuyên Nghiệp",
    subtitle: "Đồng hành cùng doanh nghiệp phát triển bền vững",
    description: "Bạn đang tìm kiếm dịch vụ kế toán uy tín, chi phí hợp lý và đáp ứng đầy đủ quy định pháp luật?\n\nChúng tôi cung cấp dịch vụ kế toán trọn gói giúp doanh nghiệp tiết kiệm thời gian, tối ưu chi phí và hạn chế tối đa rủi ro về thuế.",
    price: "Liên hệ",
    unit: "",
    sku: "KT-TG-01",
    image: "https://images.pexels.com/photos/7643734/pexels-photo-7643734.jpeg?auto=compress&cs=tinysrgb&w=1200",
    highlights: [
      "Giảm chi phí nhân sự nội bộ so với duy trì phòng kế toán",
      "Báo cáo thuế – sổ sách kế toán luôn chính xác, đúng hạn",
      "Đảm bảo tuân thủ Luật Kế toán và Thuế hiện hành",
      "Hạn chế rủi ro khi thanh kiểm tra thuế"
    ],
    problems: [
      "Không có kế toán hoặc kế toán thiếu kinh nghiệm",
      "Sổ sách không đầy đủ, sai sót nhiều",
      "Không kiểm soát được chi phí – doanh thu",
      "Lo ngại khi cơ quan thuế kiểm tra, quyết toán",
      "Tốn chi phí lớn cho nhân sự kế toán nhưng hiệu quả chưa cao"
    ],
    problemNote: "Sai sót kế toán không chỉ ảnh hưởng đến thuế mà còn tác động trực tiếp đến hoạt động kinh doanh.",
    serviceIncludes: [
      {
        title: "Dịch vụ kế toán của chúng tôi bao gồm",
        items: [
          "Tiếp nhận, kiểm tra và hạch toán chứng từ hàng tháng",
          "Lập và nộp báo cáo thuế (GTGT, TNCN, TNDN)",
          "Lập sổ sách kế toán và báo cáo tài chính cuối năm",
          "Soát xét chi phí, cân đối thuế hợp lý",
          "Tư vấn thuế thường xuyên và hỗ trợ làm việc với cơ quan thuế"
        ]
      }
    ],
    serviceNote: "Bạn có một \"phòng kế toán\" chuyên nghiệp mà không cần tuyển dụng",
    benefits: [
      { title: "Quy trình làm việc rõ ràng, minh bạch", description: "Mỗi bước từ tiếp nhận chứng từ đến nộp báo cáo đều có quy trình chuẩn, doanh nghiệp dễ theo dõi. Không có công đoạn ẩn hay thông tin mập mờ trong suốt quá trình hợp tác." },
      { title: "Báo cáo kịp thời, chính xác", description: "Toàn bộ chứng từ và số liệu được hạch toán đúng quy định kế toán hiện hành. Báo cáo định kỳ rõ ràng, dễ hiểu giúp bạn nắm tình hình tài chính nhanh chóng." },
      { title: "Hỗ trợ doanh nghiệp ngay khi có phát sinh", description: "Đội ngũ luôn sẵn sàng tư vấn và xử lý kịp thời mọi tình huống bất thường về thuế, hóa đơn hay chứng từ. Bạn không phải chờ đến cuối kỳ mới có người đồng hành." },
      { title: "Chi phí cạnh tranh – không phát sinh thêm", description: "Báo giá trọn gói minh bạch ngay từ đầu, không có phụ phí ẩn ngoài thỏa thuận. Tiết kiệm đáng kể so với chi phí duy trì kế toán nội bộ full-time." },
      { title: "Đội ngũ chuyên gia giàu kinh nghiệm", description: "Bạn không chỉ có một kế toán mà là cả đội ngũ kế toán – chuyên gia thuế đa ngành nghề hỗ trợ. Mọi vấn đề liên quan kế toán, thuế và tài chính đều được giải đáp." },
      { title: "Sẵn sàng hồ sơ khi thanh tra, quyết toán", description: "Hồ sơ kế toán được chuẩn bị đầy đủ và lưu trữ đúng quy định. Luôn trong trạng thái sẵn sàng khi cơ quan thuế kiểm tra hoặc quyết toán." }
    ],
    benefitNote: "Kế toán có người làm giúp – bạn chỉ cần tập trung phát triển doanh nghiệp.",
    process: [
      { title: "Tiếp nhận thông tin", desc: "Thu thập hồ sơ, chứng từ từ khách hàng qua email, điện thoại hoặc trực tiếp." },
      { title: "Kiểm tra chứng từ", desc: "Đánh giá tính hợp lệ, hợp pháp của hóa đơn, chứng từ." },
      { title: "Hạch toán và lập báo cáo", desc: "Ghi sổ kế toán, lập báo cáo thuế GTGT, TNDN, TNCN hàng tháng/quý." },
      { title: "Nộp báo cáo thuế", desc: "Nộp báo cáo qua phần mềm thuế điện tử, đảm bảo đúng hạn." },
      { title: "Tư vấn và hoàn thiện sổ sách", desc: "Cân đối chi phí, doanh thu, lưu trữ chứng từ theo quy định." },
      { title: "Làm việc với cơ quan thuế", desc: "Đại diện doanh nghiệp giải trình, thanh tra khi cần." },
      { title: "Bàn giao báo cáo", desc: "Cung cấp báo cáo tài chính, sổ sách hoàn chỉnh cho khách hàng." }
    ],
    processNote: "Cam kết báo cáo đúng hạn – đầy đủ – rõ ràng",
    documents: [
      { title: "Hóa đơn đầu vào và đầu ra", description: "Các chứng từ liên quan đến hoạt động kinh doanh." },
      { title: "Bảng lương và hồ sơ BHXH", description: "Thông tin về nhân viên, hợp đồng lao động." },
      { title: "Hồ sơ hải quan (nếu có)", description: "Tờ khai hải quan cho doanh nghiệp xuất nhập khẩu." },
      { title: "Chữ ký số", description: "Dùng để nộp báo cáo thuế điện tử." },
      { title: "Báo cáo tài chính trước đó (nếu có)", description: "Để đánh giá tình hình tài chính." },
      { title: "Thông tin hàng tồn kho (nếu có)", description: "Định mức tiêu thụ, nguyên liệu, sản phẩm." }
    ],
    commitments: [
      { title: "Độ chính xác 100%", description: "Đảm bảo số liệu, báo cáo thuế đúng quy định pháp luật." },
      { title: "Bảo mật thông tin", description: "Bảo mật dữ liệu tài chính của khách hàng." },
      { title: "Hỗ trợ thanh tra thuế", description: "Đại diện doanh nghiệp làm việc với cơ quan thuế." },
      { title: "Tư vấn miễn phí", description: "Hỗ trợ giải đáp các vấn đề về thuế, kế toán bất cứ lúc nào." }
    ],
    targetAudience: [
      "Doanh nghiệp mới thành lập",
      "Doanh nghiệp vừa và nhỏ không muốn duy trì phòng kế toán",
      "Doanh nghiệp cần tối ưu chi phí nhưng vẫn đảm bảo tuân thủ thuế"
    ],
    faq: [
      { q: "Dịch vụ có thay thế hoàn toàn kế toán nội bộ không?", a: "Dịch vụ kế toán có thể thay thế phần lớn công việc của kế toán nội bộ, đặc biệt với doanh nghiệp nhỏ hoặc ít phát sinh. Tuy nhiên, doanh nghiệp vẫn nên có người phụ trách phối hợp cung cấp chứng từ và theo dõi hoạt động thực tế." },
      { q: "Doanh nghiệp cần chuẩn bị gì?", a: "Doanh nghiệp cần cung cấp đầy đủ hồ sơ pháp lý như giấy phép đăng ký kinh doanh, thông tin tài khoản ngân hàng và các chứng từ phát sinh trong kỳ. Bạn chỉ cần làm bước 1, còn lại chúng tôi sẽ giúp xử lý." },
      { q: "Có hỗ trợ khi cơ quan thuế kiểm tra không?", a: "Có, dịch vụ của chúng tôi bao gồm hỗ trợ doanh nghiệp khi cơ quan thuế kiểm tra, giải trình số liệu và hồ sơ liên quan. Có chuyên viên phụ trách sẽ đại diện làm việc." },
      { q: "Chi phí dịch vụ tính như thế nào?", a: "Chi phí dịch vụ được tính dựa trên quy mô doanh nghiệp, số lượng chứng từ phát sinh và mức độ phức tạp của công việc. Doanh nghiệp nên cung cấp thông tin cụ thể để được báo giá chi tiết và phù hợp." }
    ]
  },

  // 4. Lập BCTC cuối năm
  {
    slug: "lap-bctc-cuoi-nam",
    title: "Dịch Vụ Lập Báo Cáo Tài Chính",
    subtitle: "Gọn gàng cuối năm, an tâm cả năm",
    description: "Cuối năm là lúc doanh nghiệp \"chạy deadline\" với sổ sách và báo cáo?\n\nĐừng lo – để đội ngũ kế toán chuyên nghiệp của chúng tôi giúp bạn kiểm tra, chuẩn hóa và lập Báo cáo tài chính một cách nhanh chóng và chính xác.",
    price: "Liên hệ",
    unit: "",
    sku: "BC-TC-01",
    image: "https://images.pexels.com/photos/7845358/pexels-photo-7845358.jpeg?auto=compress&cs=tinysrgb&w=1200",
    highlights: [
      "Hoàn thiện hồ sơ cuối năm đúng chuẩn, đúng hạn",
      "Yên tâm khi thanh kiểm tra thuế",
      "Tiết kiệm chi phí hơn việc thuê kế toán trưởng",
      "Thông tin tài chính rõ ràng – hỗ trợ quyết định kinh doanh"
    ],
    problems: [
      "Sổ sách kế toán chưa đầy đủ, số liệu chưa khớp",
      "Không biết cách xử lý chi phí hợp lý – hợp lệ",
      "Lo ngại sai sót khi lập báo cáo tài chính",
      "Áp lực deadline cuối năm, thiếu thời gian xử lý",
      "Sợ bị kiểm tra, quyết toán thuế"
    ],
    problemNote: "Báo cáo tài chính không chỉ là nghĩa vụ, mà còn ảnh hưởng trực tiếp đến rủi ro thuế và uy tín doanh nghiệp.",
    documents: [
      { title: "Hoá đơn GTGT đầu vào, đầu ra trong năm báo cáo" },
      { title: "Bảng lương & thông tin CCCD người lao động, Thông báo kết quả đóng BHXH (C12)" },
      { title: "Sao kê tài khoản ngân hàng công ty năm báo cáo" },
      { title: "Bảng cân đối tài khoản năm trước báo cáo" }
    ],
    serviceIncludes: [
      {
        title: "Rà soát và hoàn thiện sổ sách",
        items: [
          "Rà soát toàn bộ chứng từ, sổ sách trong năm",
          "Kiểm tra chi phí có được trừ theo luật thuế hay không",
          "Điều chỉnh các bút toán còn thiếu (khấu hao, lương, phân bổ…)",
          "Tư vấn xử lý những vấn đề \"khó nhằn\" nếu sổ sách có sai sót"
        ]
      },
      {
        title: "Lập trọn bộ Báo cáo tài chính chuẩn chỉnh",
        items: [
          "Bảng cân đối kế toán",
          "Báo cáo kết quả hoạt động kinh doanh",
          "Lưu chuyển tiền tệ",
          "Thuyết minh BCTC"
        ]
      },
      {
        title: "Quyết toán thuế và bàn giao",
        items: [
          "Lập tờ khai quyết toán thuế TNDN – TNCN",
          "Nộp báo cáo qua hệ thống thuế điện tử",
          "Bàn giao sổ sách đẹp – gọn – đầy đủ"
        ]
      }
    ],
    benefits: [
      { title: "Hoàn thiện hồ sơ cuối năm đúng chuẩn, đúng hạn", description: "Báo cáo tài chính được lập đúng chuẩn mực kế toán hiện hành và nộp đúng thời hạn quy định. Doanh nghiệp không phải chịu áp lực deadline cuối năm." },
      { title: "Yên tâm khi thanh kiểm tra thuế", description: "Hồ sơ được rà soát kỹ trước khi nộp, sai sót tiềm ẩn được phát hiện và xử lý sớm. Doanh nghiệp luôn ở trạng thái sẵn sàng nếu có kiểm tra từ cơ quan thuế." },
      { title: "Giảm rủi ro sai sót do thiếu kinh nghiệm", description: "Đội ngũ chuyên môn thực chiến nhiều năm sẽ xử lý các bút toán phức tạp, chi phí được trừ theo luật thuế. Hạn chế các lỗi thường gặp khi tự lập báo cáo." },
      { title: "Tiết kiệm chi phí hơn thuê kế toán trưởng", description: "Bạn chỉ trả phí dịch vụ theo gói cuối năm thay vì duy trì kế toán trưởng full-time. Phù hợp với doanh nghiệp nhỏ và vừa muốn tối ưu chi phí." },
      { title: "Thông tin tài chính rõ ràng", description: "Báo cáo được trình bày minh bạch, dễ hiểu, giúp lãnh đạo nắm rõ tình hình kinh doanh và đưa ra quyết định chính xác hơn." },
      { title: "Đồng hành, giải đáp mọi lúc khi bạn cần", description: "Không chỉ lập báo cáo, chúng tôi còn tư vấn trong suốt quá trình làm việc. Giải đáp các thắc mắc liên quan đến kế toán – thuế một cách kịp thời." },
      { title: "Không phát sinh chi phí bất ngờ", description: "Chi phí dịch vụ được báo trước rõ ràng, minh bạch. Không có phụ phí ẩn hoặc phát sinh ngoài thỏa thuận ban đầu." }
    ],
    benefitNote: "Báo cáo tài chính không còn là áp lực – để chúng tôi xử lý giúp bạn thật nhẹ nhàng.",
    process: [
      { title: "Tiếp nhận hồ sơ, chứng từ", desc: "Thu thập toàn bộ hồ sơ kế toán trong năm." },
      { title: "Rà soát và kiểm tra số liệu", desc: "Đối chiếu số liệu thuế – kế toán, kiểm tra chi phí." },
      { title: "Điều chỉnh & hoàn thiện sổ sách", desc: "Sửa sai sót, bổ sung bút toán còn thiếu." },
      { title: "Lập báo cáo tài chính & quyết toán thuế", desc: "Lập trọn bộ BCTC và tờ khai quyết toán." },
      { title: "Gửi khách hàng kiểm tra và nộp báo cáo", desc: "Xác nhận với khách hàng và nộp qua hệ thống thuế." }
    ],
    processNote: "Thời hạn nộp: trước ngày 31/03 hàng năm",
    comparison: true,
    targetAudience: [
      "Kế toán nội bộ còn thiếu kinh nghiệm",
      "Doanh nghiệp tự làm sổ nhưng cần \"soát lại cho chắc\"",
      "Doanh nghiệp mới, phát sinh ít",
      "Doanh nghiệp chuẩn bị quyết toán thuế và cần soát lỗi"
    ],
    faq: [
      { q: "Sổ sách chưa đầy đủ có lập được không?", a: "Trường hợp sổ sách chưa đầy đủ, doanh nghiệp vẫn có thể lập báo cáo tài chính nhưng cần thực hiện rà soát, bổ sung và hoàn thiện chứng từ trước khi lập. Chúng tôi sẽ hỗ trợ kiểm tra, điều chỉnh số liệu để đảm bảo báo cáo đúng quy định." },
      { q: "Nộp chậm báo cáo tài chính bị phạt không?", a: "Có, doanh nghiệp nộp chậm báo cáo tài chính sẽ bị xử phạt vi phạm hành chính theo quy định. Mức phạt tùy thuộc vào số ngày chậm nộp và có thể tăng dần theo thời gian vi phạm." },
      { q: "Dịch vụ có hỗ trợ quyết toán thuế không?", a: "Có, dịch vụ sẽ hỗ trợ quyết toán thuế năm cho doanh nghiệp theo quy định (bao gồm lập và nộp hồ sơ quyết toán thuế TNDN, TNCN). Chuyên viên của chúng tôi sẽ lập hồ sơ, rà soát số liệu và thay mặt doanh nghiệp giải trình khi cần thiết." }
    ]
  },

  // 5. Quyết toán thuế
  {
    slug: "quyet-toan-thue",
    title: "Dịch Vụ Hỗ Trợ Kiểm Tra/Thanh Tra Thuế",
    subtitle: "An tâm, nhẹ nhàng cuối năm – đồng hành từ A đến Z",
    description: "Khi cơ quan thuế gửi quyết định kiểm tra hoặc thanh tra, nhiều doanh nghiệp thường lo lắng: giấy tờ, số liệu, thủ tục… tất cả đều cần chuẩn bị kỹ lưỡng.\n\nĐừng lo – chúng tôi đồng hành cùng bạn từ A đến Z, giúp mọi thứ trở nên dễ dàng, minh bạch và nhanh chóng.",
    price: "Liên hệ",
    unit: "",
    sku: "QT-TH-01",
    image: "https://images.pexels.com/photos/7643893/pexels-photo-7643893.jpeg?auto=compress&cs=tinysrgb&w=1200",
    highlights: [
      "Giảm căng thẳng khi có đoàn kiểm tra đến",
      "Tiết kiệm thời gian – chúng tôi xử lý hồ sơ và giải trình thay bạn",
      "Giảm rủi ro – tối ưu nghiệp vụ thuế, tránh sai sót và phạt hành chính",
      "Đại diện làm việc trực tiếp với cơ quan thuế"
    ],
    problems: [
      "Sổ sách kế toán chưa chuẩn, số liệu không khớp",
      "Chi phí không hợp lý – hợp lệ theo quy định",
      "Thiếu chứng từ, hóa đơn đầu vào",
      "Không nắm rõ quy định khi cơ quan thuế kiểm tra",
      "Bị truy thu thuế và phạt chậm nộp"
    ],
    problemNote: "Quyết toán thuế là giai đoạn \"nhạy cảm\" nhất – sai sót nhỏ cũng có thể khiến doanh nghiệp mất rất nhiều chi phí.",
    serviceIncludes: [
      {
        title: "Rà soát, chuẩn bị hồ sơ và chứng từ",
        items: ["Đảm bảo mọi giấy tờ, hóa đơn, sổ sách kế toán đều sẵn sàng, đầy đủ và đúng quy định trước khi đoàn kiểm tra đến."]
      },
      {
        title: "Kiểm tra – tư vấn số liệu",
        items: ["Phát hiện các vấn đề tiềm ẩn, hướng dẫn điều chỉnh trước khi làm việc với cơ quan thuế."]
      },
      {
        title: "Hỗ trợ giải trình trực tiếp",
        items: ["Thay mặt hoặc phối hợp cùng doanh nghiệp trao đổi, giải thích số liệu, cung cấp hồ sơ cho đoàn kiểm tra."]
      },
      {
        title: "Tư vấn xử lý rủi ro",
        items: ["Nếu phát sinh nghĩa vụ thuế bổ sung hoặc vướng mắc, chúng tôi hướng dẫn phương án tối ưu, hợp pháp."]
      },
      {
        title: "Theo dõi kết luận kiểm tra",
        items: ["Hỗ trợ thực hiện các nghĩa vụ theo kết luận của cơ quan thuế, đảm bảo doanh nghiệp yên tâm hoàn tất quy trình."]
      }
    ],
    benefits: [
      { title: "Giảm căng thẳng", description: "Không còn lo lắng khi có đoàn kiểm tra đến. Mọi bước từ chuẩn bị hồ sơ đến giải trình đều có chuyên gia đồng hành." },
      { title: "Tiết kiệm thời gian", description: "Chúng tôi xử lý hồ sơ và giải trình giúp bạn. Doanh nghiệp không phải bỏ công đi lại nhiều với cơ quan thuế." },
      { title: "Giảm rủi ro", description: "Tối ưu mọi nghiệp vụ thuế, tránh sai sót và phạt hành chính. Sai sót tiềm ẩn được phát hiện và xử lý sớm trước khi cơ quan thuế kết luận." },
      { title: "Chuyên nghiệp – tận tâm", description: "Đồng hành cùng doanh nghiệp từ lúc nhận quyết định kiểm tra đến khi hoàn tất quy trình. Sẵn sàng hỗ trợ xuyên suốt mọi vướng mắc." },
      { title: "Đại diện làm việc với cơ quan thuế", description: "Chúng tôi thay mặt doanh nghiệp giải trình và trao đổi trực tiếp với cơ quan thuế. Bạn không cần trực tiếp đối mặt với áp lực kiểm tra." },
      { title: "Bảo mật tuyệt đối thông tin", description: "Toàn bộ dữ liệu tài chính, hồ sơ doanh nghiệp được bảo mật nghiêm ngặt, không chia sẻ với bên thứ ba khi chưa có sự đồng ý." }
    ],
    process: [
      { title: "Tiếp nhận hồ sơ, báo cáo hiện tại", desc: "Thu thập toàn bộ hồ sơ kế toán và báo cáo thuế." },
      { title: "Rà soát và đánh giá rủi ro thuế", desc: "Kiểm tra số liệu, phát hiện sai sót và rủi ro tiềm ẩn." },
      { title: "Tư vấn phương án xử lý", desc: "Đề xuất giải pháp điều chỉnh phù hợp." },
      { title: "Hoàn thiện hồ sơ quyết toán", desc: "Chuẩn bị đầy đủ hồ sơ, chứng từ cần thiết." },
      { title: "Hỗ trợ giải trình khi cơ quan thuế kiểm tra", desc: "Đại diện doanh nghiệp làm việc với cơ quan thuế." }
    ],
    processNote: "Đồng hành xuyên suốt đến khi hoàn tất quyết toán",
    commitments: [
      { title: "Cam kết về chất lượng hồ sơ", description: "Hồ sơ đầy đủ – đúng quy định – sẵn sàng giải trình. Chúng tôi cam kết chuẩn bị hồ sơ quyết toán theo đúng quy định pháp luật hiện hành." },
      { title: "Cam kết về kiểm soát rủi ro", description: "Rà soát kỹ trước khi quyết toán – hạn chế tối đa sai sót. Toàn bộ số liệu và hồ sơ được kiểm tra nhiều lớp trước khi nộp." },
      { title: "Cam kết đồng hành khi làm việc với cơ quan thuế", description: "Hỗ trợ giải trình & làm việc với cơ quan thuế khi cần. Sẵn sàng hỗ trợ giải trình, làm việc với cơ quan thuế khi có yêu cầu." },
      { title: "Cam kết minh bạch & rõ ràng", description: "Tư vấn rõ ràng – không phát sinh chi phí ẩn. Mọi rủi ro, phương án xử lý và chi phí đều được trao đổi trước với khách hàng." },
      { title: "Cam kết bảo mật thông tin", description: "Bảo mật tuyệt đối dữ liệu tài chính doanh nghiệp. Không chia sẻ cho bên thứ ba khi chưa có sự đồng ý của khách hàng." },
      { title: "Cam kết tối ưu hợp pháp", description: "Tối ưu chi phí thuế trên cơ sở hợp lệ – đúng luật. Đảm bảo lợi ích cho doanh nghiệp nhưng vẫn tuân thủ pháp luật." }
    ],
    targetAudience: [
      "Doanh nghiệp không có kế toán thuế chuyên trách",
      "Doanh nghiệp lo ngại về hồ sơ, chứng từ trước khi thanh tra",
      "Doanh nghiệp muốn yên tâm, minh bạch, an toàn khi làm việc với cơ quan thuế"
    ],
    faq: [
      { q: "Khi nào doanh nghiệp bị quyết toán thuế?", a: "Doanh nghiệp có thể bị quyết toán thuế khi thuộc kế hoạch kiểm tra định kỳ của cơ quan thuế hoặc khi có dấu hiệu rủi ro về thuế. Ngoài ra, các trường hợp như hoàn thuế, giải thể hoặc thay đổi lớn về hoạt động cũng thường bị kiểm tra quyết toán." },
      { q: "Sổ sách sai có xử lý kịp trước quyết toán không?", a: "Có, doanh nghiệp hoàn toàn có thể rà soát và điều chỉnh sổ sách trước khi cơ quan thuế tiến hành quyết toán. Việc xử lý sớm sẽ giúp giảm thiểu rủi ro bị truy thu và xử phạt." },
      { q: "Có bắt buộc phải có mặt khi cơ quan thuế kiểm tra không?", a: "Doanh nghiệp không nhất thiết phải trực tiếp có mặt nếu đã ủy quyền cho đơn vị dịch vụ chúng tôi làm việc với cơ quan thuế. Tuy nhiên, trong một số trường hợp đặc biệt, cơ quan thuế có thể yêu cầu đại diện doanh nghiệp phối hợp." },
      { q: "Chi phí dịch vụ tính như thế nào?", a: "Chi phí dịch vụ được xác định dựa trên quy mô doanh nghiệp, số lượng chứng từ và mức độ phức tạp của hồ sơ. Doanh nghiệp nên cung cấp thông tin cụ thể để được báo giá chi tiết và minh bạch." }
    ]
  },

  // 6. Rà soát sổ sách kế toán
  {
    slug: "ra-soat-so-sach",
    title: "Dịch Vụ Rà Soát Sổ Sách Kế Toán",
    subtitle: "Chính xác – An tâm – Không lo sai sót",
    description: "Sổ sách kế toán là \"xương sống\" của mọi doanh nghiệp. Một sổ sách không chuẩn, thiếu chứng từ hay số liệu sai lệch có thể dẫn đến rủi ro thuế, thất thoát chi phí, hoặc khó ra quyết định kinh doanh.\n\nDịch vụ Rà soát sổ sách kế toán của chúng tôi giúp bạn kiểm tra, chỉnh sửa và tối ưu hóa toàn bộ sổ sách, để doanh nghiệp hoạt động minh bạch – an toàn – hiệu quả.",
    price: "Liên hệ",
    unit: "",
    sku: "RS-SS-01",
    image: "https://images.pexels.com/photos/7845349/pexels-photo-7845349.jpeg?auto=compress&cs=tinysrgb&w=1200",
    highlights: [
      "Sổ sách chuẩn – số liệu chính xác, an tâm về báo cáo tài chính",
      "Phát hiện sai sót kịp thời – tránh rủi ro bị phạt hoặc truy thu",
      "Tối ưu chi phí hợp lý – quản lý tài chính hiệu quả hơn",
      "Tiết kiệm thời gian – đội ngũ chuyên nghiệp lo toàn bộ"
    ],
    problems: [
      "Số liệu kế toán – thuế không khớp",
      "Chi phí tăng cao bất thường",
      "Lợi nhuận không phản ánh đúng thực tế",
      "Hóa đơn, chứng từ thiếu hoặc chưa hợp lệ",
      "Kế toán cũ nghỉ việc, bàn giao không rõ ràng",
      "Chuẩn bị quyết toán thuế hoặc bị kiểm tra"
    ],
    problemNote: "Nếu không rà soát kịp thời, những sai sót nhỏ có thể trở thành rủi ro lớn khi cơ quan thuế kiểm tra.",
    serviceIncludes: [
      {
        title: "Kiểm tra chứng từ và bút toán",
        items: [
          "Đối chiếu số liệu giữa hóa đơn, phiếu thu/chi, ngân hàng và sổ sách.",
          "Phát hiện các bút toán sai, thiếu hoặc chưa hợp lý."
        ]
      },
      {
        title: "Rà soát sổ sách kế toán",
        items: [
          "Kiểm tra tính đầy đủ, hợp lý và tuân thủ chuẩn mực kế toán.",
          "Soát xét các chi phí, doanh thu, công nợ, khấu hao, phân bổ chi phí…"
        ]
      },
      {
        title: "Điều chỉnh và đề xuất tối ưu",
        items: [
          "Hướng dẫn điều chỉnh các bút toán còn sai sót.",
          "Tư vấn cân đối chi phí hợp lý, hợp pháp theo quy định thuế."
        ]
      },
      {
        title: "Báo cáo kết quả rà soát",
        items: [
          "Tổng hợp tình trạng sổ sách, những điểm cần điều chỉnh và phương án xử lý.",
          "Cung cấp báo cáo rõ ràng, dễ hiểu, sẵn sàng cho nội bộ hoặc cơ quan thuế."
        ]
      }
    ],
    benefits: [
      { title: "Sổ sách chuẩn – số liệu chính xác", description: "Giúp doanh nghiệp yên tâm về báo cáo tài chính và thuế. Hệ thống sổ sách được chuẩn hóa đồng bộ theo quy định hiện hành sau khi rà soát." },
      { title: "Phát hiện sai sót kịp thời", description: "Tránh rủi ro bị phạt hoặc truy thu thuế. Những lỗi nhỏ nếu được phát hiện sớm sẽ dễ xử lý và ít tốn chi phí hơn so với khi cơ quan thuế phát hiện." },
      { title: "Tối ưu chi phí hợp lý", description: "Giúp quản lý tài chính hiệu quả hơn. Chúng tôi kiểm tra các khoản chi phí để đảm bảo đáp ứng điều kiện được trừ theo quy định thuế." },
      { title: "Tiết kiệm thời gian", description: "Không phải tự rà soát thủ công, đội ngũ chuyên nghiệp sẽ lo toàn bộ. Bạn nhận được báo cáo kết quả rõ ràng, dễ hiểu, sẵn sàng dùng nội bộ hoặc giải trình." },
      { title: "Hỗ trợ mọi nghiệp vụ phức tạp", description: "Phù hợp với doanh nghiệp nhiều phát sinh, ngành nghề khác nhau. Đội ngũ chuyên môn đa lĩnh vực có thể xử lý cả các bút toán phức tạp." },
      { title: "An tâm khi lập báo cáo tài chính & quyết toán", description: "Dữ liệu đã được rà soát là nền tảng chính xác để lập BCTC và quyết toán thuế. Hạn chế tối đa sai sót trong các báo cáo quan trọng cuối năm." }
    ],
    process: [
      { title: "Tiếp nhận hồ sơ, sổ sách hiện tại", desc: "Thu thập toàn bộ sổ sách và chứng từ kế toán." },
      { title: "Kiểm tra và phân tích số liệu", desc: "Đối chiếu, phân tích các khoản mục kế toán." },
      { title: "Đánh giá rủi ro và sai sót", desc: "Phát hiện các điểm sai lệch và rủi ro tiềm ẩn." },
      { title: "Báo cáo kết quả rà soát", desc: "Cung cấp báo cáo chi tiết về tình trạng sổ sách." },
      { title: "Tư vấn phương án xử lý", desc: "Đề xuất giải pháp điều chỉnh và tối ưu." }
    ],
    processNote: "Có báo cáo chi tiết, dễ hiểu cho doanh nghiệp",
    targetAudience: [
      "Doanh nghiệp muốn kiểm tra sổ sách trước khi quyết toán thuế",
      "Doanh nghiệp có kế toán nội bộ nhưng chưa tự tin về số liệu",
      "Doanh nghiệp cần soát lại chi phí, công nợ, doanh thu để ra quyết định kinh doanh chính xác"
    ],
    faq: [
      { q: "Rà soát sổ sách có bắt buộc không?", a: "Rà soát sổ sách không phải là thủ tục bắt buộc theo quy định pháp luật, nhưng rất cần thiết để đảm bảo số liệu kế toán chính xác. Đây là bước nên thực hiện định kỳ để hạn chế rủi ro." },
      { q: "Phát hiện sai sót có xử lý được không?", a: "Có, khi phát hiện sai sót trong quá trình rà soát, doanh nghiệp hoàn toàn có thể thực hiện điều chỉnh và bổ sung theo quy định. Việc xử lý sớm sẽ giúp giảm thiểu rủi ro bị truy thu hoặc xử phạt." },
      { q: "Dịch vụ có làm lại sổ sách không?", a: "Có, chúng tôi có thể hỗ trợ làm lại sổ sách trong trường hợp doanh nghiệp chưa hạch toán hoặc số liệu sai lệch. Tùy vào mức độ thiếu sót, thời gian và chi phí thực hiện sẽ khác nhau." },
      { q: "Bao lâu có kết quả rà soát?", a: "Thường từ vài ngày đến 1–2 tuần, tùy thuộc vào số lượng chứng từ và mức độ phức tạp của hồ sơ. Doanh nghiệp nên cung cấp đầy đủ tài liệu để quá trình rà soát diễn ra nhanh chóng." }
    ]
  },

  // 7. Giấy phép lao động & Thẻ tạm trú
  {
    slug: "giay-phep-lao-dong",
    title: "Dịch Vụ Giấy Phép Lao Động & Thẻ Tạm Trú",
    subtitle: "Hỗ trợ người nước ngoài làm việc hợp pháp tại Việt Nam",
    description: "Bạn là nhà tuyển dụng hoặc người nước ngoài muốn làm việc tại Việt Nam nhưng lo lắng về thủ tục pháp lý phức tạp?\n\nDịch vụ của chúng tôi giúp hoàn thiện giấy phép lao động, thẻ tạm trú và Work Permit một cách nhanh chóng, chính xác và tuân thủ pháp luật, để bạn yên tâm tập trung công việc.",
    price: "Liên hệ",
    unit: "",
    sku: "GP-LD-01",
    image: "https://images.pexels.com/photos/7845104/pexels-photo-7845104.jpeg?auto=compress&cs=tinysrgb&w=1200",
    highlights: [
      "Nhanh chóng – chính xác, hồ sơ đầy đủ giảm tối đa rủi ro bị trả lại",
      "Tiết kiệm thời gian – chúng tôi xử lý toàn bộ thủ tục thay bạn",
      "Tuân thủ pháp luật Bộ Lao động và Xuất nhập cảnh",
      "Hỗ trợ tận tâm trong suốt quá trình"
    ],
    problems: [
      "Không nắm rõ quy định về lao động nước ngoài",
      "Hồ sơ phức tạp, nhiều giấy tờ hợp pháp hóa lãnh sự",
      "Sai sót hồ sơ dẫn đến bị từ chối cấp phép",
      "Mất nhiều thời gian làm việc với cơ quan nhà nước",
      "Lo ngại bị xử phạt khi sử dụng lao động chưa có giấy phép"
    ],
    problemNote: "Việc sử dụng lao động nước ngoài không đúng quy định có thể dẫn đến mức phạt rất cao và ảnh hưởng đến hoạt động doanh nghiệp.",
    serviceIncludes: [
      {
        title: "Giấy phép lao động (Work Permit)",
        items: [
          "Tư vấn điều kiện pháp lý để cấp giấy phép lao động.",
          "Chuẩn bị hồ sơ, hợp đồng lao động, bảo hiểm y tế và các giấy tờ liên quan.",
          "Nộp hồ sơ và theo dõi tiến trình cấp phép.",
          "Hỗ trợ xử lý hồ sơ khi cơ quan chức năng yêu cầu bổ sung hoặc chỉnh sửa."
        ]
      },
      {
        title: "Thẻ tạm trú (TRC)",
        items: [
          "Tư vấn các loại thẻ tạm trú phù hợp (dài hạn, làm việc, đầu tư…).",
          "Chuẩn bị hồ sơ, hợp đồng thuê nhà, giấy phép lao động, bảo hiểm y tế.",
          "Hướng dẫn và nộp hồ sơ tại cơ quan quản lý xuất nhập cảnh.",
          "Theo dõi và nhận thẻ tạm trú đúng thời hạn."
        ]
      },
      {
        title: "Hỗ trợ liên quan",
        items: [
          "Tư vấn gia hạn, điều chỉnh hợp đồng và hồ sơ khi cần.",
          "Tư vấn chi tiết về luật lao động và nhập cảnh cho người nước ngoài.",
          "Giải đáp các vấn đề phát sinh trong quá trình xin cấp phép."
        ]
      }
    ],
    serviceNote: "Khách hàng không cần trực tiếp xử lý hồ sơ phức tạp",
    benefits: [
      { title: "Nhanh chóng – chính xác", description: "Hồ sơ đầy đủ, được kiểm tra kỹ từng thành phần để giảm tối đa rủi ro bị trả lại. Đảm bảo hồ sơ được chuẩn bị đúng ngay từ đầu, hạn chế sai sót thường gặp." },
      { title: "Tiết kiệm thời gian", description: "Chúng tôi xử lý toàn bộ thủ tục thay bạn, từ tư vấn, chuẩn bị hồ sơ đến nộp và theo dõi kết quả. Phù hợp với doanh nghiệp bận rộn hoặc người nước ngoài chưa quen thủ tục tại Việt Nam." },
      { title: "Tuân thủ pháp luật", description: "Đảm bảo hồ sơ hợp pháp, đúng quy định Bộ Lao động và Xuất nhập cảnh. Đội ngũ luôn cập nhật quy định mới nhất để hồ sơ đúng luật." },
      { title: "Hỗ trợ tận tâm", description: "Tư vấn mọi vướng mắc trong quá trình làm giấy phép và thẻ tạm trú. Mỗi hồ sơ đều có chuyên viên phụ trách riêng, theo dõi xuyên suốt đến khi hoàn tất." },
      { title: "Minh bạch & dễ hiểu", description: "Không rối rắm, không thuật ngữ khó hiểu. Chúng tôi giải thích quy trình và hồ sơ bằng ngôn ngữ đơn giản, đặc biệt phù hợp với khách nước ngoài hoặc người không chuyên về pháp lý." },
      { title: "Hạn chế rủi ro bị từ chối hồ sơ", description: "Nhiều hồ sơ bị từ chối do thiếu giấy tờ hoặc chuẩn bị sai cách. Chúng tôi rà soát trước các yếu tố rủi ro và tư vấn điều chỉnh kịp thời để tăng tỷ lệ được cấp phép." }
    ],
    process: [
      { title: "Tiếp nhận thông tin người lao động & doanh nghiệp", desc: "Thu thập thông tin và hồ sơ ban đầu." },
      { title: "Tư vấn loại hồ sơ và điều kiện", desc: "Đánh giá điều kiện và tư vấn loại hồ sơ phù hợp." },
      { title: "Chuẩn bị và hoàn thiện hồ sơ", desc: "Soạn thảo, kiểm tra và hoàn thiện toàn bộ hồ sơ." },
      { title: "Nộp hồ sơ và theo dõi xử lý", desc: "Nộp hồ sơ tại cơ quan chức năng và theo dõi tiến trình." },
      { title: "Bàn giao giấy phép / thẻ tạm trú", desc: "Nhận và bàn giao kết quả cho khách hàng." }
    ],
    processTime: "Giấy phép lao động: 10 – 20 ngày làm việc | Thẻ tạm trú: 5 – 10 ngày làm việc",
    targetAudience: [
      "Doanh nghiệp tuyển dụng người nước ngoài cần làm giấy phép lao động và thẻ tạm trú",
      "Người nước ngoài muốn làm việc hợp pháp tại Việt Nam",
      "Công ty muốn tối ưu quy trình nhập cảnh, lao động nước ngoài và giảm rủi ro pháp lý"
    ],
    faq: [
      { q: "Người nước ngoài có bắt buộc phải có giấy phép lao động không?", a: "Người lao động nước ngoài làm việc tại Việt Nam thông thường bắt buộc phải có giấy phép lao động theo quy định. Tuy nhiên, một số trường hợp đặc biệt được miễn nhưng vẫn cần thực hiện thủ tục xác nhận miễn giấy phép với cơ quan chức năng." },
      { q: "Thời hạn giấy phép lao động là bao lâu?", a: "Giấy phép lao động cho người nước ngoài tại Việt Nam có thời hạn tối đa là 02 năm. Khi hết hạn, doanh nghiệp có thể thực hiện thủ tục gia hạn thêm nhưng cũng không quá 02 năm cho mỗi lần gia hạn." },
      { q: "Có thể làm thẻ tạm trú khi chưa có work permit không?", a: "Thông thường, người nước ngoài không thể làm thẻ tạm trú nếu chưa có giấy phép lao động. Tuy nhiên, vẫn có một số trường hợp ngoại lệ như nhà đầu tư, thành viên góp vốn hoặc thuộc diện miễn giấy phép lao động." },
      { q: "Hồ sơ cần chuẩn bị những gì?", a: "Tùy trường hợp, hồ sơ bao gồm hộ chiếu, giấy khám sức khỏe, lý lịch tư pháp và bằng cấp/chứng chỉ chuyên môn. Ngoài ra, doanh nghiệp cần chuẩn bị văn bản chấp thuận nhu cầu sử dụng lao động nước ngoài. Tất cả giấy tờ nước ngoài phải được hợp pháp hóa lãnh sự và dịch thuật công chứng." }
    ]
  },

  // 8. Thành lập doanh nghiệp
  {
    slug: "thanh-lap-doanh-nghiep",
    title: "Dịch Vụ Thành Lập Doanh Nghiệp",
    subtitle: "Nhanh chóng – Đầy đủ – Không lo rắc rối",
    description: "Bạn đang có ý tưởng kinh doanh nhưng chưa biết bắt đầu từ đâu?\n\nDịch vụ Thành lập doanh nghiệp của chúng tôi giúp bạn khởi tạo công ty mới một cách nhanh chóng, đầy đủ thủ tục pháp lý và tuân thủ đúng quy định, để bạn chỉ cần tập trung vào việc phát triển kinh doanh.",
    price: "Liên hệ",
    unit: "",
    sku: "TL-DN-01",
    image: "https://images.pexels.com/photos/7643860/pexels-photo-7643860.jpeg?auto=compress&cs=tinysrgb&w=1200",
    highlights: [
      "Nhanh chóng – tiết kiệm thời gian, không lo thủ tục rườm rà",
      "Đầy đủ pháp lý – đăng ký hợp pháp, tuân thủ luật",
      "Tư vấn chuyên nghiệp từng bước, tránh sai sót",
      "Hỗ trợ toàn diện từ tư vấn đến vận hành sau thành lập"
    ],
    problems: [
      "Không nắm rõ quy trình và hồ sơ pháp lý",
      "Lựa chọn loại hình doanh nghiệp chưa phù hợp",
      "Đặt tên công ty bị trùng hoặc không hợp lệ",
      "Không hiểu rõ nghĩa vụ thuế sau khi thành lập",
      "Mất thời gian đi lại, chỉnh sửa hồ sơ nhiều lần"
    ],
    problemNote: "Chỉ một sai sót nhỏ cũng có thể khiến hồ sơ bị từ chối hoặc phải làm lại từ đầu.",
    serviceIncludes: [
      {
        title: "Tư vấn trước khi thành lập",
        items: [
          "Tư vấn loại hình doanh nghiệp phù hợp (TNHH 1 thành viên, TNHH 2 thành viên, cổ phần…).",
          "Tư vấn đặt tên công ty, ngành nghề kinh doanh và vốn điều lệ.",
          "Hướng dẫn quy trình pháp lý và nghĩa vụ thuế ban đầu."
        ]
      },
      {
        title: "Chuẩn bị hồ sơ và nộp thủ tục",
        items: [
          "Soạn thảo hồ sơ đăng ký doanh nghiệp tại Sở Kế hoạch & Đầu tư.",
          "Hướng dẫn doanh nghiệp hoàn thiện hồ sơ, chữ ký và con dấu.",
          "Theo dõi tiến trình và nhận Giấy chứng nhận đăng ký doanh nghiệp."
        ]
      },
      {
        title: "Hỗ trợ thủ tục thuế ban đầu",
        items: [
          "Tư vấn kê khai thuế ban đầu và lựa chọn phương pháp kế toán.",
          "Hướng dẫn phát hành hóa đơn điện tử (nếu cần)."
        ]
      },
      {
        title: "Tư vấn các vấn đề pháp lý và vận hành ban đầu",
        items: [
          "Tư vấn mở tài khoản ngân hàng doanh nghiệp.",
          "Tư vấn ký hợp đồng lao động, bảo hiểm xã hội cho nhân viên.",
          "Hỗ trợ giải đáp các vấn đề pháp lý, thuế, kế toán ban đầu."
        ]
      }
    ],
    serviceNote: "Bạn chỉ cần cung cấp thông tin – chúng tôi xử lý toàn bộ phần còn lại",
    benefits: [
      { title: "Nhanh chóng – tiết kiệm thời gian", description: "Không phải lo lắng thủ tục rườm rà. Hồ sơ được xử lý ngay từ lần nộp đầu tiên, hạn chế tối đa việc bị trả hồ sơ hoặc chỉnh sửa nhiều lần." },
      { title: "Đầy đủ pháp lý", description: "Đảm bảo doanh nghiệp được đăng ký hợp pháp và tuân thủ luật. Hồ sơ được soạn thảo đúng biểu mẫu, đầy đủ thông tin và phù hợp với quy định pháp luật hiện hành." },
      { title: "Tư vấn chuyên nghiệp", description: "Được hướng dẫn chi tiết từng bước, tránh sai sót. Chúng tôi tư vấn loại hình phù hợp, đặt tên công ty, ngành nghề và vốn điều lệ tối ưu cho mô hình kinh doanh." },
      { title: "Tiết kiệm chi phí", description: "Không phát sinh nhiều chi phí ngoài dự kiến. Báo giá trọn gói minh bạch ngay từ đầu, mọi khoản phí và phạm vi xử lý đều được trao đổi cụ thể." },
      { title: "Hỗ trợ toàn diện", description: "Từ tư vấn ban đầu đến vận hành công ty sau khi thành lập. Bao gồm hướng dẫn mở tài khoản ngân hàng, kê khai thuế ban đầu, phát hành hóa đơn điện tử, hợp đồng lao động và BHXH." },
      { title: "Sẵn sàng vận hành ngay", description: "Sau khi hoàn tất thủ tục, doanh nghiệp đã có đầy đủ điều kiện pháp lý để hoạt động. Chúng tôi hỗ trợ các bước cần thiết ban đầu để công ty đi vào vận hành nhanh chóng." }
    ],
    process: [
      { title: "Soạn hồ sơ đăng ký thành lập công ty", desc: "Soạn hồ sơ đúng biểu mẫu hiện hành." },
      { title: "Trình khách hàng ký hồ sơ tận nơi", desc: "Mang hồ sơ đến tận nơi để ký." },
      { title: "Nộp hồ sơ tại Sở Kế hoạch & Đầu tư", desc: "Đại diện khách hàng nộp hồ sơ." },
      { title: "Theo dõi quá trình xét duyệt", desc: "Theo dõi đến khi được cấp giấy phép đăng ký kinh doanh." },
      { title: "Bàn giao kết quả cùng con dấu", desc: "Đại diện nhận và bàn giao kết quả cho doanh nghiệp." }
    ],
    processTime: "3 – 5 ngày làm việc",
    documents: [
      { title: "CMND/CCCD hoặc Hộ chiếu", description: "Của các thành viên sáng lập, cổ đông hoặc người đại diện pháp luật (bản sao công chứng)." },
      { title: "Tên công ty dự kiến", description: "Đã tra cứu và đảm bảo không trùng lặp." },
      { title: "Loại hình công ty", description: "Công ty TNHH, Công ty cổ phần, Doanh nghiệp tư nhân, Hộ kinh doanh." },
      { title: "Địa chỉ trụ sở chính của công ty" },
      { title: "Ngành nghề kinh doanh chính" },
      { title: "Vốn điều lệ của công ty" },
      { title: "Thông tin thành viên góp vốn", description: "Họ tên, thông tin liên lạc, tỷ lệ góp vốn (nếu là công ty cổ phần hoặc TNHH nhiều thành viên)." },
      { title: "Giấy ủy quyền (nếu có)", description: "Nếu người đi làm thủ tục không phải là người đại diện pháp luật trực tiếp." }
    ],
    targetAudience: [
      "Cá nhân, nhóm khởi nghiệp muốn lập công ty nhanh chóng",
      "Doanh nghiệp muốn mở thêm chi nhánh hoặc công ty con",
      "Nhà đầu tư cần tư vấn loại hình công ty, ngành nghề và thuế ngay từ đầu"
    ],
    faq: [
      { q: "Thành lập công ty cần bao nhiêu vốn?", a: "Pháp luật hiện nay không quy định mức vốn tối thiểu đối với đa số ngành nghề, do đó doanh nghiệp có thể tự đăng ký vốn điều lệ phù hợp với quy mô hoạt động. Tuy nhiên, một số ngành nghề đặc thù sẽ yêu cầu vốn pháp định theo quy định riêng." },
      { q: "Có cần địa chỉ kinh doanh không?", a: "Có, doanh nghiệp bắt buộc phải có địa chỉ trụ sở chính khi đăng ký thành lập. Địa chỉ này cần rõ ràng, hợp lệ và không được đặt tại chung cư chỉ có chức năng để ở. Có thể sử dụng nhà riêng, văn phòng thuê hoặc văn phòng ảo phù hợp quy định." },
      { q: "Sau khi thành lập cần làm gì tiếp theo?", a: "Sau khi thành lập công ty, bạn cần treo bảng hiệu tại địa chỉ đăng ký, mua chữ ký số để nộp thuế, mở tài khoản ngân hàng và nộp lệ phí môn bài. Đồng thời, phải đăng ký hóa đơn điện tử, thực hiện khai thuế ban đầu và nộp các báo cáo thuế định kỳ. Ngoài ra, cần góp đủ vốn trong vòng 90 ngày." },
      { q: "Có thể thành lập công ty online không?", a: "Có. Chúng tôi hỗ trợ toàn bộ quy trình từ xa thông qua Cổng thông tin quốc gia về đăng ký doanh nghiệp. Hồ sơ được nộp và xử lý trực tuyến, không cần đi lại." }
    ]
  }
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return services.find(s => s.slug === slug);
}
