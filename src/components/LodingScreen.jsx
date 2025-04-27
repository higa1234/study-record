import styled from "styled-components";

export const LodingScreen = () => {
    return(
        <Sdiv>読み込み中…</Sdiv>
    )
}

const Sdiv = styled.div`
    position: absolute;
    left: 0; top: 0;
    width: 100%; height: 100%;
    background: rgba(100, 100, 100, .8);
    z-index: 2147483647;
`
