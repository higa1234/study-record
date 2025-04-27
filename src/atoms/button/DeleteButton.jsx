import styled from 'styled-components';

export const DeleteButton = (props) => {
    const {onClickDelete} = props;
    return (
        <SButton onClick={onClickDelete}>削除</SButton>
    );
}

const SButton = styled.button`
  border-radius: 2px;
  border: 1px solid transparent;
  padding: 0.4em 0.8em;
  font-size: 0.8em;
  font-weight: 500;
  font-family: inherit;
  background-color: #333;
  color: #ccc;
  transition: border-color 0.25s;
  margin-left: 8px;

  &:hover {
    border-color: #646cff;
    background: #338033;
    cursor: pointer;
  }

  &:focus,
  &:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }
`;