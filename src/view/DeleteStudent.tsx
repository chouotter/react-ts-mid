import { useState } from 'react';
import { asyncDelete } from '../utils/fetch';
import { api } from '../enum/api';
import { Link } from 'react-router-dom';

function DeleteStudent() {
  const [userName, setUserName] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim()) {
      setMessage('請輸入有效的帳號');
      return;
    }

    try {
      const response = await asyncDelete(api.DeleteStudent, { userName });
      if (response.code === 200) {
        setMessage(`刪除成功！伺服器訊息：${response.message}`);
      } else {
        setMessage(`刪除失敗：伺服器訊息：${response.message}`);
      }
    } catch (error) {
      setMessage(`發生錯誤，無法連接伺服器。`);
    }
  };

  return (
    <div>
      <nav>
        <Link to="/">返回學生列表</Link>
      </nav>
      <h2>刪除學生資料</h2>
      {message && <div className="server-message">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userName">帳號: </label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={userName}
            onChange={handleChange}
          />
        </div>
        <button type="submit">刪除</button>
      </form>
    </div>
  );
}

export default DeleteStudent;
