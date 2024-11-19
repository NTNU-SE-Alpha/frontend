import { motion } from 'framer-motion';
import { marked } from 'marked';
import styled from 'styled-components';
const Container = styled.div`
  margin-left: 120px;
`;

export default function Settings() {
  const markdownText = `
  # 這是標題

  這是一段文字，用於說明 **加粗文字** 和 _斜體文字_。

  ## 子標題

  - 列表項目 1
  - 列表項目 2
  - 列表項目 3

  \`\`\`javascript
  // 代碼區塊範例
  function hello() {
    console.log("Hello, world!");
  }
  \`\`\`

  > 這是一段引言。
  `;

  const markdownContent = marked(markdownText);

  return (
    <Container>
    <div className="markdown-body">
      <div dangerouslySetInnerHTML={{ __html: markdownContent }} />
      <motion.div
        initial={{ x: -100 }}
        animate={{ x: 100 }}
        transition={{
          type: 'spring',
          duration: 0.3,
          stiffness: 150,
        }}
      >
        Setting Page
      </motion.div>
      <motion.div>content</motion.div>

      <motion.div initial={{ y: -100 }} animate={{ y: 100 }}>
        Setting Page
      </motion.div>
    </div>
    </Container>
  );
}
