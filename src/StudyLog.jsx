import { useEffect, useState } from 'react'
import './App.css'
import { InputStudy } from './components/InputStudy';
import { StudyRecords } from './components/StudyRecords';
import { StudyTotalHours } from './components/StudyTotalHours';
import {getAllStudyRecords, insertStudyRecords, deleteStudyRecordsById} from "./utils/SupaBaseFunctions.js";
import { LodingScreen } from './components/LodingScreen.jsx';

export const StudyLog = () => {
  const [studyText, setStudyText] = useState(""); // 勉強内容
  const [studyHour, setStudyHour] = useState(0); // 勉強時間
  const [records, setRecords] = useState([]);
  const [error, setError] = useState("");
  const [times, setTimes] = useState(0);
  const [isLoading, setIsLoading] = useState(true); //読み込み

  // テストデータ
  // const records = [
  //   { title: "勉強の記録1", time: 1},
  //   { title: "勉強の記録2", time: 3},
  //   { title: "勉強の記録3", time: 5}
  // ]

  useEffect(() => {
    try {
      fetchData();
    }catch(error){
      // Error内容記述
    }finally{
      setIsLoading(false);
    }
  }, []);
  

  //supabaseからデータを取得し、recordsに追加
  const fetchData = async () => {
    const {data, error} = await getAllStudyRecords(); // 配列で受け取る
    if(error){
      console.error("データ追加エラー:", error);
      return;
    }
    const newDbRecords = data.map((dbRecord)=>{
       return {id: dbRecord.id, title: dbRecord.title, time: dbRecord.time};
     })
    setRecords(newDbRecords);
    getTotalHours(newDbRecords);
  }

  // supabaseへ、recordsを1件追加
  const insData = async () => {
    try{
      await insertStudyRecords(studyText, parseInt(studyHour));
      await fetchData(); // 挿入後、再取得
    }catch(error){
      console.error("データ挿入失敗:", error.message);
      return error; // 必要ならここで返してもいい
    }
  }

  // 
  const onChangeStudyText = (event) => {
    setStudyText(event.target.value);
  }
  // 
  const onChangeStudyHour = (event) => {
    setStudyHour(event.target.value);
  }

  // 学習時間の合計を集計
  const getTotalHours = (records) => {
    const hours = records.reduce((prev, current) => {
      return prev + current.time;
    }, 0);
    setTimes(hours);
  }

  // 登録ボタンで勉強内容・勉強時間を登録
  const onClickAdd = () => {
    // エラーチェック
    if(studyText === "" || studyHour === 0){
      setError("入力されていない項目があります");
      return;
    }
    setError("");
    insData(studyText, studyHour);   // データをInsert
    setStudyText("");
    setStudyHour(0);
  }

    // supabaseからレコードを削除
    const dltData = async(id) => {
      try{
        await deleteStudyRecordsById(id);
        await fetchData(); // 削除後、再取得
      }catch(error){
        console.error("データ削除失敗:", error.message);
        return error; // 必要ならここで返してもいい
      }
    }

    //削除ボタンで勉強内容・勉強時間を削除
    const onClickDelete = (id) => {
      dltData(id);
  }


  return (
    <>
      <div>
        <h1>学習記録一覧</h1>
      </div>

      {isLoading && <LodingScreen></LodingScreen>}

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
        onClickDelete={onClickDelete}
      />
      <StudyTotalHours totalHours={times}/>
    </>
  )
}
