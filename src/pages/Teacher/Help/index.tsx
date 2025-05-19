import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const Help: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', { selectedOption, message });

  };

  const handleEditorChange = (content: string, editor: any) => {
    setMessage(content);
  };

  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white border-2 rounded-lg w-[1503px] h-[800px] shadow-lg grid grid-cols-12 ">
        <div className="col-span-8 p-6" style={{ width: '900px', }}>
          <h1 className="text-38px font-bold text-gray-800 mb-2">Bạn có thắc mắc?</h1>
          <p className="text-gray-600 mb-10">Chúng tôi sẽ phản hồi bạn trong thời gian sớm nhất có thể.</p>
          <div className="mb-4 font-bold">
            <label className="inline-flex items-center mr-6">
              <input
                type="radio"
                name="option"
                value="Đào tạo"
                checked={selectedOption === 'Đào tạo'}
                onChange={(e) => setSelectedOption(e.target.value)}
                className="form-radio text-orange-500"
              />
              <span className="ml-2 text-gray-700">Đào tạo</span>
            </label>

            <label className="inline-flex items-center mr-6">
              <input
                type="radio"
                name="option"
                value="Hỗ trợ"
                checked={selectedOption === 'Hỗ trợ'}
                onChange={(e) => setSelectedOption(e.target.value)}
                className="form-radio text-orange-500 border-2"
              />

              <span className="ml-2 text-gray-700">Học vụ</span>
            </label>
            <label className="inline-flex items-center mr-6">
              <input
                type="radio"
                name="option"
                value="Sample1"
                checked={selectedOption === 'Sample1'}
                onChange={(e) => setSelectedOption(e.target.value)}
                className="form-radio text-orange-500"
              />
              <span className="ml-2 text-gray-700">Sample</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="option"

                value="Sample2"
                checked={selectedOption === 'Sample2'}
                onChange={(e) => setSelectedOption(e.target.value)}
                className="form-radio text-orange-500"
              />
              <span className="ml-2 text-gray-700">Sample</span>
            </label>
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Chủ đề"
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
            />

            <Editor
              apiKey="dtg3ufww3eud22vtprd0r7rpiud2tcwf62kzq7oscu6q6qzy" // API key
              value={message}
              onEditorChange={handleEditorChange}
              init={{
                height: 325,
                menubar: false,
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount',
                ],
                toolbar:
                  'undo redo | formatselect | bold italic underline | alignleft aligncenter alignright | bullist numlist outdent indent | link image | table | removeformat',
                content_style: 'body { font-family: Arial, sans-serif; font-size: 14px; }',
              }}
            />
          </div>

          <div className="flex justify-center">
            <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 w-40 h-[52px]"
              onClick={handleSubmit}>
              Gửi
            </button>
          </div>
        </div>
        <div className="col-span-2 rounded-r-lg flex flex-col justify-between ml-10">
          <div className="bg-orange-50 p-4 rounded-l-lg mt-36 absolute" style={{ width: '490px', height: '543px' }}>
            <div className="justify-center mt-24 ml-6">
              <h3 className="text-[28px] font-bold text-gray-800 mb-10">Thông tin</h3>
              <ul className="space-y-4 text-gray-700 text-[16px]">
                <li className="flex items-start">
                  <img src="/icon/location_outline.png" alt="location" className="w-8 h-8 object-cover" />
                  <div className="ml-2 pl-4 mb-2" style={{ borderLeft: '1px solid #373839' }}>
                    <p className='font-semibold text-lg'><strong>CN1:</strong> 86/33 Âu Cơ, Phường 9, Quận Tân Bình</p>
                    <p className='font-semibold text-lg'><strong>CN2:</strong> 86/33 Âu Cơ, Phường 9, Quận Tân Bình</p>
                    <p className='font-semibold text-lg'><strong>CN3:</strong> 86/33 Âu Cơ, Phường 9, Quận Tân Bình</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <img src="/icon/phone.png" alt="phone" className="w-8 h-8 object-cover" />
                  <div className="ml-2 pl-4 mb-5" style={{ borderLeft: '1px solid #373839' }}>
                    <p className='font-semibold text-lg'>(028) 2243 6888</p>
                    <p className='font-semibold text-lg'>(028) 6268 1426</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <img src="/icon/u_envelope-alt.png" alt="mail" className="w-8 h-8 object-cover" />
                  <span className='font-semibold text-lg ml-2 pl-4' style={{ borderLeft: '1px solid #373839' }}>media_infor@alta.com.vn</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-span-2 bg-[#CC5C00] rounded-r-lg flex flex-col justify-between "
          style={{ height: '800px', width: '280px' }}>
        </div>
      </div>
    </div>
  );
};

export default Help;