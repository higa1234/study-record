export const StudyRecords = (props) => {
    const {records} = props;
    return (
      <div>
        <ul>
          {records.map((obj, index) => (
            <li key={obj}>
              <p>{obj.title} {obj.time} 時間</p>
            </li>
          ))}
        </ul>
      </div>
    );
}