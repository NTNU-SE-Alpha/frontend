import { motion } from 'framer-motion';
import { marked } from 'marked';
import styled from 'styled-components';
import Loading from '../Components/Loading';
const Container = styled.div`
  margin-left: 120px;
`;

export default function Settings() {
  const markdownText = `
  # 設定
  > [更新密碼](/update-password)  
  
  > [更新個人資料](/update-profile)

  > [刪除帳號](/delete-account)


  
  `;

  const markdownContent = marked(markdownText);

  return (
    <Container>
      <div className="markdown-body">
        <div dangerouslySetInnerHTML={{ __html: markdownContent }} />
        {/* <motion.div
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
        </motion.div> */}
        <Loading />
      </div>
    </Container>
  );
}
