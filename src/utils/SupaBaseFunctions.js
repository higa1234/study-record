import {supabase} from "./SupaBase.js";

// supabaseのstudy-recordテーブルを全件取得
export const getAllStudyRecords = async () => {
    const {data, error} = await supabase.from("study-record").select("*");
    if(error) {
      console.error("データ取得エラー:", error);
    }
    return {data, error};
};

// supabaseのstudy-recordテーブルに1行挿入
export const insertStudyRecords = async (title, time) => {
  const {error} = await supabase.from("study-record").insert({title:title, time: time});
  if (error) {
    console.error("データ追加エラー:", error);
    throw new Error(error.message); 
  }
} 

// supabaseのstudy-recordテーブルから、指定IDのレコードを削除
export const deleteStudyRecordsById = async (id) => {
  const {error} = await supabase.from("study-record").delete().eq("id", id);
  if (error) {
    console.error("データ削除エラー:", error);
    throw new Error(error.message); 
  }
} 