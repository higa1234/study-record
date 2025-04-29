export const InputStudy = (props) => {
    const {studyText, studyHour, onChangeStudyText, onChangeStudyHour, onClickAdd, errorMsg} = props;
    return (
      <div>
        <div>
        <p><label>学習内容：<input id="title" type="text" value={studyText} onChange={onChangeStudyText}/></label></p>
        <p><label>学習時間：<input id="hour" type="number" value={studyHour} onChange={onChangeStudyHour}/></label> 時間</p>
        </div>
        <hr />
        <div>
            <p>入力されている学習内容：{studyText}</p>
            <p>入力されている学習時間：{studyHour} 時間</p>
        </div>
        <hr />
        <div>
          <button onClick={onClickAdd}>登録</button>
          {(errorMsg != "") && <p style={{ color: "red" }}>{errorMsg}</p>}
        </div>
        <hr />
      </div>
    );
};