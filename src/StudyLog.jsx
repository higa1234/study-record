import { useState } from 'react'
import './App.css'
import { InputStudy } from './components/InputStudy';
import { StudyRecords } from './components/StudyRecords';
import { StudyTotalHours } from './components/StudyTotalHours';

export const StudyLog = () => {
  const [studyText, setStudyText] = useState(""); // 勉強内容
  const [studyHour, setStudyHour] = useState(0); // 勉強時間
  const [records, setRecords] = useState([]);
  const [error, setError] = useState("");
  const [times, setTimes] = useState(0);

  // テストデータ
  // const records = [
  //   { title: "勉強の記録1", time: 1},
  //   { title: "勉強の記録2", time: 3},
  //   { title: "勉強の記録3", time: 5}
  // ]

  // 
  const onChangeStudyText = (event) => {
    setStudyText(event.target.value);
  }
  // 
  const onChangeStudyHour = (event) => {
    setStudyHour(event.target.value);
  }

  // 学習時間の合計を集計
  const getTotalHours = () => {
    setTimes(times+ parseInt(studyHour));
  }

  // 登録ボタンで勉強内容・勉強時間を登録
  const onClickAdd = () => {
    // エラーチェック
    if(studyText === "" || studyHour === 0){
      setError("入力されていない項目があります");
      return;
    }
    setError("");
    const newRecords = [...records, {title: studyText, time: studyHour}];
    setRecords(newRecords);
    getTotalHours();
    setStudyText("");
    setStudyHour(0);
    
  }

  return (
    <>
      <div>
        <h1>学習記録一覧</h1>
      </div>
      <InputStudy
        studyText={studyText}
        studyHour={studyHour}
        onChangeStudyText={onChangeStudyText}
        onChangeStudyHour={onChangeStudyHour}
        onClickAdd={onClickAdd}
        errorMsg={error}
      />
      <StudyRecords
        records={records}
      />
      <StudyTotalHours totalHours={times}/>
    </>
  )
}
