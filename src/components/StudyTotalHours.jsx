export const StudyTotalHours = (props) => {
    const {totalHours} = props;
    return (
        <div>
          <p>合計時間：{totalHours} ／ 1000(h)</p>
        </div>
    )
}