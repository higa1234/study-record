import { DeleteButton } from "../atoms/button/DeleteButton";
import { deleteStudyRecordsById } from "../utils/SupaBaseFunctions";

export const StudyRecords = (props) => {
    const {records, onClickDelete} = props;
    return (
      <div>
        <table>
          <tbody>
            {records.map((record) => (
              <tr key={record.id}>
                <td>{record.title}　{record.time} 時間</td>
                <td><DeleteButton onClickDelete={() => onClickDelete(record.id)}/></td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
    );
}