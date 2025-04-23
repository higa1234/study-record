export const InputStudyText = (props) => {
    const {studyText, onChange} = props;
    return (
        <div>
            学習内容：<input value={studyText} onChange={onChange}/>
            <p>入力されている学習内容：{studyText}</p>
        </div>
    )
};