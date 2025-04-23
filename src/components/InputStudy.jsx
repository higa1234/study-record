export const InputStudy = (props) => {
    const {studyText, studyHour, onChangeStudyText, onChangeStudyHour, onClickAdd, errorMsg} = props;
    return (
      <div>
        <div>
            <p>学習内容：<input type="text" value={studyText} onChange={onChangeStudyText}/></p>
            <p>学習時間：<input type="number" value={studyHour} onChange={onChangeStudyHour}/>時間</p>
        </div>
        <div>
            <p>入力されている学習内容：{studyText}</p>
            <p>入力されている学習時間：{studyHour}時間</p>
        </div>
        <div>
          <button onClick={onClickAdd}>登録</button>
          {(errorMsg != "") && <p style={{ color: "red" }}>{errorMsg}</p>}
        </div>
      </div>
    );
}