import React from 'react';
import styled from 'styled-components';
const Container = styled.input`
  display: flex;
  min-height: 80px;
  width: 100%;
  border-radius: 0.375rem; /* 等於 rounded-md */
  border: 1px solid var(--input, #4db6ac); /* 默認為 teal */
  background-color: var(--background, #e0f2f1); /* 默認為 teal 淺色 */
  padding: 0.5rem 0.75rem; /* px-3 py-2 */
  font-size: 1rem; /* text-base */
  outline: none; /* 去掉外部框線 */
  color: var(--text-color, #004d40); /* 字體默認為深色 teal */
  transition:
    box-shadow 0.2s,
    border-color 0.2s; /* 提供 focus 效果平滑過渡 */

  &::placeholder {
    color: var(--muted-foreground, #80cbc4); /* 默認為更淺的 teal */
  }

  &:focus-visible {
    outline: none;
    border-color: #26a69a; /* 更亮的 teal */
    box-shadow:
      0 0 0 2px #80cbc4,
      /* 環境光 */ 0 0 0 4px #e0f7fa; /* focus-visible:ring-2 */
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    background-color: #b2dfdb; /* 禁用時的背景色 */
    border-color: #80cbc4; /* 禁用時的邊框色 */
    color: #004d40; /* 禁用時的字體顏色 */
  }

  @media (min-width: 768px) {
    font-size: 0.875rem; /* md:text-sm */
  }
`;

const Textarea = ({ children, ...rest }) => {
  return <Container {...rest}>{children}</Container>;
};

export default Textarea;
