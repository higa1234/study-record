// モックの宣言
jest.mock("../utils/SupaBaseFunctions.js", () => ({
  getAllStudyRecords: jest.fn().mockResolvedValue({ data: [
    { id: 1, title: "記録1", time: 10 },
    { id: 2, title: "記録2", time: 4 },
    { id: 3, title: "記録3", time: 2 }
  ], error: null }),
  insertStudyRecords: jest.fn().mockResolvedValue(undefined),
  deleteStudyRecordsById: jest.fn().mockResolvedValue(undefined),

}));

// テストで使う関数だけ import（モック実体が入ってくる）
import {
  getAllStudyRecords,
  insertStudyRecords,
  deleteStudyRecordsById,
} from "../utils/SupaBaseFunctions.js";

import { StudyLog } from "../StudyLog.jsx";
import React from "react";
import '@testing-library/jest-dom'
import { render, screen, waitFor, cleanup, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

beforeEach(() => {
  // 毎回テスト開始前に、モックの呼び出し回数や戻り値をリセット
  jest.clearAllMocks();
});

afterEach(() => {
  // 毎回テスト後に、画面のクリーンアップ
  cleanup();
});

describe("StudyLogのテスト", () => {
  
  it("タイトルが「学習記録一覧」であること", () => {
    // testId(title)を指定して取得
    render(<StudyLog />);
    const title = screen.getByTestId("title");
    expect(title).toHaveTextContent("学習記録一覧");
  });


  test("フォームに学習内容と時間を入力して登録ボタンを押すと新たに記録が追加されている 数が1つ増えていることをテストする", 
    async () => {
      render(<StudyLog />);

      // ローディングが終わるまで待機（data-testid追加が必要）
      await waitForElementToBeRemoved(() => screen.getByTestId("loading"));

      // 初期の useEffect → fetchData() の完了を待つ
      await waitFor(() => {
        expect(getAllStudyRecords).toHaveBeenCalled();
      });

      // 現在のリストの数を確認
      const beforeRows = await screen.findAllByRole('row');

      // ここでモックの戻り値を登録用に上書き
      getAllStudyRecords.mockResolvedValueOnce({
        data: [
          { id: 1, title: "記録1", time: 10 },
          { id: 2, title: "記録2", time: 4 },
          { id: 3, title: "記録3", time: 2 },
          { id: 4, title: "React", time: 6 }
        ],
        error: null,
      });

      // 呼び出し
      // ユーザー操作を再現
      await userEvent.type(screen.getByLabelText(/学習内容/), "React");
      await userEvent.type(screen.getByLabelText(/学習時間/), "6");
      await userEvent.click(screen.getByRole("button", { name: /登録/ }));

      await waitFor(() => {
        expect(insertStudyRecords).toHaveBeenCalledTimes(1);
        expect(insertStudyRecords).toHaveBeenCalledWith("React", 6);
        expect(getAllStudyRecords).toHaveBeenCalled(); // 登録後のfetchData

        // 画面上の確認
        expect(screen.getByText(/React\s*6\s*時間/)).toBeInTheDocument();
    }, { timeout: 5000 });

    // リストが増えたことを確認
    await waitFor(async () => {
        const updatedRows = await screen.findAllByRole('row');
        expect(updatedRows.length).toBe(beforeRows.length + 1);
    });
  });

  test("削除ボタンを押すと学習記録が削除される 数が1つ減っていることをテストする", 
    async () => {
      render(<StudyLog />);

      // ローディングが終わるまで待機（data-testid追加が必要）
      await waitForElementToBeRemoved(() => screen.getByTestId("loading"));
  
      // 初期の useEffect → fetchData() の完了を待つ
      await waitFor(() => {
        expect(getAllStudyRecords).toHaveBeenCalled();
      });
  
      // ここで「記録3 2時間」が画面に存在することをまず確認
      expect(screen.getByText(/記録3\s*2\s*時間/)).toBeInTheDocument();
      // 現在のリストの数を確認
      const beforeRows = await screen.findAllByRole('row');

      // 削除後のデータを上書き
      getAllStudyRecords.mockResolvedValueOnce({
        data: [
          { id: 1, title: "記録1", time: 10 },
          { id: 2, title: "記録2", time: 4 }
        ],
        error: null,
      });
      
      // 画面上の「削除ボタン」を全取得
      const deleteButtons = screen.getAllByRole("button", { name: /削除/ });

      // ユーザー再現
      // 3つあるうちの3番目（index=2）の削除ボタンを押す
      await userEvent.click(deleteButtons[2]);

      await waitFor(() => {
        expect(deleteStudyRecordsById).toHaveBeenCalledTimes(1);
        expect(deleteStudyRecordsById).toHaveBeenCalledWith(3);
        expect(getAllStudyRecords).toHaveBeenCalled(); // 登録後のfetchData
  
        // 画面上の確認
        expect(screen.queryByText(/記録3\s*2\s*時間/)).not.toBeInTheDocument();
      });

      // リストが減ったことを確認
      await waitFor(async () => {
        const updatedRows = await screen.findAllByRole('row');
        expect(updatedRows.length).toBe(beforeRows.length - 1);
      });
    });

    test("入力をしないで登録を押すとエラーが表示される", 
      async () => {
        render(<StudyLog />);

      // ローディングが終わるまで待機（data-testid追加が必要）
      await waitForElementToBeRemoved(() => screen.getByTestId("loading"));
    
        // 初期の useEffect → fetchData() の完了を待つ
        await waitFor(() => {
          expect(getAllStudyRecords).toHaveBeenCalled();
        });

        // ===================================
        // パターン① 学習内容空、学習時間0
        // ===================================
        await userEvent.click(screen.getByRole("button", { name: /登録/ }));

        expect(screen.getByText(/入力されていない項目があります/)).toBeInTheDocument();

        // ===================================
        // パターン② 学習内容あり、学習時間0
        // ===================================
        await userEvent.type(screen.getByLabelText(/学習内容/), "テスト");
        await userEvent.click(screen.getByRole("button", { name: /登録/ }));

        expect(screen.getByText(/入力されていない項目があります/)).toBeInTheDocument();

        // クリア
        await userEvent.clear(screen.getByLabelText(/学習内容/));
        await userEvent.clear(screen.getByLabelText(/学習時間/));

        // ===================================
        // パターン③ 学習内容なし、学習時間あり
        // ===================================
        await userEvent.type(screen.getByLabelText(/学習時間/), "6");
        await userEvent.click(screen.getByRole("button", { name: /登録/ }));

        expect(screen.getByText(/入力されていない項目があります/)).toBeInTheDocument();

      });

  
});