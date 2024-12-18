import { useState } from 'react';
import { asyncPost } from '../utils/fetch';
import { api } from '../enum/api';
import { Link } from 'react-router-dom';

function AddStudent() {
  const [formData, setFormData] = useState({
    userName: '',
    name: '',
    department: '',
    grade: '',
    class: '',
    email: '',
    absences: 0,
  });

  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: name === 'absences' ? parseInt(value, 10) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await asyncPost(api.AddStudent, formData);
      if (response.code === 200) {
        setMessage(`新增成功！伺服器訊息：${response.message}`);
        setFormData({
          userName: '',
          name: '',
          department: '',
          grade: '',
          class: '',
          email: '',
          absences: 0,
        });
      } else {
        setMessage(`新增失敗：伺服器訊息：${response.message}`);
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
      <h2>新增學生資料</h2>
      {message && <div className="server-message">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userName">帳號: </label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">姓名: </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="department">院系: </label>
          <input
            type="text"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="grade">年級: </label>
          <input
            type="text"
            id="grade"
            name="grade"
            value={formData.grade}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="class">班級: </label>
          <input
            type="text"
            id="class"
            name="class"
            value={formData.class}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">提交</button>
      </form>
    </div>
  );
}

export default AddStudent;
