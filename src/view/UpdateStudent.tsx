import { useState } from 'react';
import { asyncUpdate } from '../utils/fetch';
import { api } from '../enum/api';
import { Link } from 'react-router-dom';

function UpdateStudent() {
    const [userName, setUserName] = useState('');
    const [newName, setNewName] = useState('');
    const [message, setMessage] = useState('');

    const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewName(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userName.trim() || !newName.trim()) {
            setMessage('請輸入有效的帳號和新名字');
            return;
        }

        try {
            const response = await asyncUpdate(api.UpdateStudent, { userName, name: newName });
            if (response.code === 200) {
                setMessage(`更新成功！伺服器訊息：${response.message}`);
            } else {
                setMessage(`更新失敗：伺服器訊息：${response.message}`);
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
            <h2>更新學生資料</h2>
            {message && <div className="server-message">{message}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="userName">帳號: </label>
                    <input
                        type="text"
                        id="userName"
                        name="userName"
                        value={userName}
                        onChange={handleUserNameChange}
                    />
                </div>
                <div>
                    <label htmlFor="newName">新名字: </label>
                    <input
                        type="text"
                        id="newName"
                        name="newName"
                        value={newName}
                        onChange={handleNameChange}
                    />
                </div>
                <button type="submit">更新</button>
            </form>
        </div>
    );
}

export default UpdateStudent;
