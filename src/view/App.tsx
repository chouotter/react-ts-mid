import { useEffect, useRef, useState } from 'react';
import '../style/App.css';
import { asyncGet } from '../utils/fetch';
import { api } from '../enum/api';
import { Student } from '../interface/Student';
import { resp } from '../interface/resp';
import { Link } from 'react-router-dom';

function App() {
  const [students, setStudents] = useState<Array<Student>>([]);
  const [filteredStudents, setFilteredStudents] = useState<Array<Student>>([]);
  const [absenceFilter, setAbsenceFilter] = useState<string>(''); 
  const [nameFilter, setNameFilter] = useState<string>(''); 
  const [sidFilter, setSidFilter] = useState<string>(''); 
  const cache = useRef<boolean>(false);

  useEffect(() => {
    /**
     * 做緩存處理, 避免多次發起請求
     */
    if (!cache.current) {
      cache.current = true;
      asyncGet(api.findAll).then((res: resp<Array<Student>>) => {
        if (res.code === 200) {
          setStudents(res.body);
          setFilteredStudents(res.body); // 預設顯示所有學生
        }
      });
    }
  }, []);

  // 處理缺席篩選變更
  const handleAbsenceFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAbsenceFilter(value); // 修改為處理為字符串
  };

  // 處理姓名篩選變更
  const handleNameFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNameFilter(value);
  };

  // 處理座號篩選變更
  const handleSidFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSidFilter(value);
  };

  // 篩選學生資料的函式
  const handleFilter = () => {
    let filtered = students;

    // 根據缺席次數篩選
    if (absenceFilter !== '') {
      const absenceNum = parseInt(absenceFilter, 10);
      if (!isNaN(absenceNum)) {
        filtered = filtered.filter(student => (student.absences || 0) === absenceNum);
      }
    }

    // 根據姓名篩選
    if (nameFilter) {
      filtered = filtered.filter(student => student.name.startsWith(nameFilter));
    }

    // 根據座號篩選
    if (sidFilter) {
      filtered = filtered.filter(student => student.sid === sidFilter);
    }

    setFilteredStudents(filtered);
  };

  // 重置所有篩選條件
  const handleReset = () => {
    setAbsenceFilter('');
    setNameFilter('');
    setSidFilter('');
    setFilteredStudents(students); // 重設為顯示所有學生
  };

  // 如果沒有符合條件的學生，顯示提示
  const studentList = filteredStudents && filteredStudents.length > 0 ? (
    filteredStudents.map((student: Student) => (
      <div className="student" key={student._id}>
        <p>帳號: {student.userName}</p>
        <p>座號: {student.sid}</p>
        <p>姓名: {student.name}</p>
        <p>院系: {student.department}</p>
        <p>年級: {student.grade}</p>
        <p>班級: {student.class}</p>
        <p>Email: {student.Email}</p>
        <p>缺席次數: {student.absences ? student.absences : 0}</p>
      </div>
    ))
  ) : (
    <p>無符合條件的學生</p>
  );

  return (
    <>
      <nav>
        <Link to="/add-student">新增學生</Link>
      </nav>
      <nav>
        <Link to="/delete-student">刪除學生</Link>
      </nav>
      <nav>
        <Link to="/update-student">更新學生</Link>
      </nav>
      <div className="filter">
        <label htmlFor="absenceFilter">缺席次數: </label>
        <input
          id="absenceFilter"
          type="text"
          value={absenceFilter}
          onChange={handleAbsenceFilterChange}
          placeholder="請輸入缺席次數"
        />
        <button onClick={handleFilter}>篩選</button>
      </div>

      <div className="filter">
        <label htmlFor="nameFilter">姓名: </label>
        <input
          id="nameFilter"
          type="text"
          value={nameFilter}
          onChange={handleNameFilterChange}
          placeholder="請輸入姓氏"
        />
        <button onClick={handleFilter}>篩選</button>
      </div>

      <div className="filter">
        <label htmlFor="sidFilter">座號: </label>
        <input
          id="sidFilter"
          type="text"
          value={sidFilter}
          onChange={handleSidFilterChange}
          placeholder="請輸入座號"
        />
        <button onClick={handleFilter}>篩選</button>
      </div>

      {/* 將重置按鈕放在座號篩選區塊下方 */}
      <div className="reset">
        <button onClick={handleReset}>重置篩選條件</button>
      </div>

      <div className="container">{studentList}</div>
    </>
  );
}

export default App;
