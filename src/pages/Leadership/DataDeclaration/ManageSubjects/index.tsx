import { useEffect, useState } from 'react';
import { SearchIcon, ArrowUpDownIcon } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../../../../components/Dropdown';
import apiInstance from '../../../../services/api';
import DeletePopup from '../../../../components/Popup/Delete';
import { useLoading } from '../../../../context/loading';
import { showToast } from '../../../../components/Toasted';

interface Course {
  id: number;
  subjectTypeId: number;
  isStatus: boolean;
  subjectCode: string;
  subjectName: string;
  description: string;
  semester1PeriodCount: number;
  semester2PeriodCount: number;
}

export default function ManageSubjects() {
  const { setLoading } = useLoading();

  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourses, setSelectedCourses] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Course | null; direction: 'asc' | 'desc' | null }>({
    key: null,
    direction: null,
  });
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [courseIdToDelete, setCourseIdToDelete] = useState<number | null>(null);
  const [selectedKhoi, setSelectedKhoi] = useState('6');
  // const [classOptions, setClassOptions] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  // useEffect(() => {
  //   const fetchClassOptions = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await apiInstance.get('api/classes');
  //       if (response.data.status === 0) {
  //         setClassOptions(response.data.data);
  //       } else {
  //         console.error('Error fetching classes:', response.data.message);
  //       }
  //     } catch (error) {
  //       console.error('API Error:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchClassOptions();
  // }, []);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await apiInstance.get('api/subject', {
          params: { pageNumber: currentPage, pageSize: itemsPerPage, khoi: selectedKhoi },
        });
        if (response.data.status === 0) {
          setCourses(response.data.data.items);
          setTotalPages(response.data.data.totalPages);
        } else {
          console.error('Error fetching subjects:', response.data.message);
        }
      } catch (error) {
        console.error('API Error:', error);
      }
    };
    fetchSubjects();
  }, [currentPage, itemsPerPage, selectedKhoi]);

  const filteredCourses = courses.filter(
    (course) =>
      course.subjectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.subjectCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortConfig.key) {
      const valueA = a[sortConfig.key]!.toString().toLowerCase();
      const valueB = b[sortConfig.key]!.toString().toLowerCase();
      return sortConfig.direction === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    }
    return 0;
  });

  const handleSort = (key: keyof Course) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleDeleteRequest = (id: number) => {
    setCourseIdToDelete(id);
    setIsPopupOpen(true);
  };

  const handleDelete = async () => {
    if (courseIdToDelete === null) return;

    try {
      setLoading(true);
      await apiInstance.delete('api/subject', {
        data: { ids: [courseIdToDelete] },
      });
      setCourses((prev) => prev.filter((course) => course.id !== courseIdToDelete));
      setIsPopupOpen(false);
      showToast("Xóa môn học thành công!", "success");
    } catch (error) {
      showToast("Xóa môn học thất bại!", "success");
      setIsPopupOpen(false);
    } finally {
      setLoading(false);

    }
  };

  const handleCancelDelete = () => {
    setIsPopupOpen(false);
  };

  const handleCheckboxChange = () => {
    setSelectedCourses(selectedCourses.length === courses.length ? [] : courses.map((c) => c.id));
  };

  const handleCheckboxChangeCourse = (courseId: number) => {
    setSelectedCourses((prev) =>
      prev.includes(courseId) ? prev.filter((id) => id !== courseId) : [...prev, courseId]
    );
  };

  return (
    <div className="w-full mx-auto font-sans p-6">
      <div className="flex items-center gap-4 mb-4">
        {/* <div className="flex items-center gap-2">
          <span>Khối</span>
          <Dropdown
            options={[{ id: '6', value: '6' }, { id: '7', value: '7' }, { id: '8', value: '8' }]}
            onChange={(value) => setSelectedKhoi(value.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <span>Lớp</span>
          <Dropdown options={classOptions.find((item) => item.khoi === selectedKhoi)?.classes || []} />
        </div> */}
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium">Môn học</h2>
        <div className="relative w-[300px]">
          <input
            type="text"
            placeholder="Tìm kiếm"
            className="pl-10 pr-4 py-2 border rounded-[50px] w-full outline-none bg-gray-100 focus:ring-2 focus:ring-orange-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="rounded-md shadow-sm overflow-hidden bg-white">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#ff7506] text-white">
              <th className="p-3">
                <input
                  type="checkbox"
                  checked={selectedCourses.length === courses.length}
                  onChange={handleCheckboxChange}
                  className="cursor-pointer"
                />
              </th>
              {['subjectCode', 'subjectName'].map((key) => (
                <th
                  key={key}
                  className="cursor-pointer p-3 text-left"
                  onClick={() => handleSort(key as keyof Course)}
                >
                  <div className="flex items-center gap-2">
                    {key === 'subjectCode' ? 'Mã môn học' : 'Tên môn học'}
                    <ArrowUpDownIcon className="h-4 w-4" />
                  </div>
                </th>
              ))}
              <th className="p-3 text-center">Số tiết HK1</th>
              <th className="p-3 text-center">Số tiết HK2</th>
              <th className="p-3 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {sortedCourses.map((course) => (
              <tr key={course.id} className="border-t">
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedCourses.includes(course.id)}
                    onChange={() => handleCheckboxChangeCourse(course.id)}
                    className="cursor-pointer"
                  />
                </td>
                <td className="p-3 text-center">{course.subjectCode}</td>
                <td className="p-3 text-center">{course.subjectName}</td>
                <td className="p-3 text-center">{course.semester1PeriodCount}</td>
                <td className="p-3 text-center">{course.semester2PeriodCount}</td>
                <td className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => navigate(`edit/${course.id}`)}
                    className="text-orange-500 hover:text-orange-700"
                  >
                    <FontAwesomeIcon icon={faEdit} size="lg" />
                  </button>
                  <button
                    onClick={() => handleDeleteRequest(course.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FontAwesomeIcon icon={faTrash} size="lg" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DeletePopup
        isOpen={isPopupOpen}
        onCancel={handleCancelDelete}
        onConfirm={handleDelete}
        title="Xóa môn học"
        text="Bạn có chắc chắn muốn xóa môn học này?"
      />
      {/* Pagination Section */}
      <div className="flex items-center justify-between pt-6">
        <div className="text-sm text-gray-600 flex items-center space-x-2">
          <span className="italic">Hiển thị</span>
          <input
            type="number"
            min={5}
            max={20}
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="w-12 h-6 border border-orange-500 rounded-md text-center focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
          <span className="italic">hàng trong mỗi trang</span>
        </div>

        <div className="flex items-center gap-1 text-sm">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-2 py-1 text-gray-600 hover:bg-gray-200 disabled:text-gray-300"
          >
            {'<'}
          </button>
          <span>
            Trang {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-2 py-1 text-gray-600 hover:bg-gray-200 disabled:text-gray-300"
          >
            {'>'}
          </button>
        </div>
      </div>
    </div>
  );
}
