import React from 'react';
import Button from '../../../../components/Button';
import Dropdown from '../../../../components/Dropdown';
import { Option } from '../../../../components/Dropdown/type';

const AddProfileStudent = () => {
  const styles = {
    container: {
      padding: '16px',
    },
    nav: {
      fontSize: '14px',
      marginBottom: '16px',
      width: '100%',
    },
    breadcrumbList: {
      display: 'flex',
      alignItems: 'center',
    },
    inactiveText: {
      color: '#C9C4C0',
      fontSize: '14px',
      letterSpacing: '0.27px',
    },
    svgArrow: {
      margin: '0 8px',
      height: '20px',
      width: '20px',
    },
    arrowColor: '#CC5C00',
    activeText: {
      color: '#373839',
      fontSize: '30px',
      fontWeight: 700,
      letterSpacing: '0.72px',
    },
    headerBackground: {
      backgroundColor: '#CC5C00',
      // padding: '10px',
      borderRadius: '16px 16px 0 0',
      color: 'white',
      fontSize: '18px',
      fontWeight: 'bold',
      padding: '10px 10px 10px 50px',
    },
    headerBackground2: {
      backgroundColor: '#CC5C00',
      color: 'white',
      fontSize: '18px',
      fontWeight: 'bold',
      padding: '10px 10px 10px 50px',
    },
    content: {
      display: 'flex' as const,
      flexDirection: 'row' as const,
      gap: '20px',
      padding: '20px',
      background: '#fff',
      borderRadius: '0 0 16px 16px',
      boxShadow: '4px 4px 25px 4px rgba(154, 202, 245, 0.25)',
    },
    content2: {
      display: 'flex' as const,
      flexDirection: 'row' as const,
      gap: '20px',
      paddingTop: '0px !important',
      padding: '20px',
      background: '#fff',
      borderRadius: '0 0 16px 16px',
      boxShadow: '4px 4px 25px 4px rgba(154, 202, 245, 0.25)',
    },
    content3: {
      display: 'flex' as const,
      flexDirection: 'row' as const,
      gap: '20px',
      paddingTop: '0px !important',
      padding: '20px',
      background: '#fff',
      // borderRadius: '0 0 16px 16px',
      // boxShadow: '4px 4px 25px 4px rgba(154, 202, 245, 0.25)',
    },
    leftColumn: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      right: 0,
    },
    leftColumn2: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      right: 0,
    },
    rightColumn: {
      flex: 3,
    },
    rightColumn2: {
      flex: 3,
    },
    avatar: {
      width: '180px',
      height: '180px',
      marginRight: '20px',
    },
    title: {
      color: '#CC5C00',
      fontFamily: '"Source Sans Pro"',
      fontSize: '18px',
      fontWeight: 700,
      lineHeight: 'normal',
      marginBottom: '20px',
      letterSpacing: '0.24px',
    },
    title2: {
      color: '#CC5C00',
      fontFamily: '"Source Sans Pro"',
      fontSize: '18px',
      fontWeight: 700,
      lineHeight: 'normal',
      marginBottom: '20px',
      letterSpacing: '0.24px',
      marginLeft: '19px',
    },
    inputs: {
      display: 'flex' as const,
      flexDirection: 'column' as const,
      gap: '12px',
      fontSize: '14px',
      fontFamily: 'Arial, sans-serif',
    },
    field: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      justifyContent: 'flex-start' as const, // Thêm dòng này để căn label và input
      width: '100%',
    },
    label: {
      whiteSpace: 'nowrap' as const,
      minWidth: '150px', // Đảm bảo label có độ rộng cố định
      color: '#373839',
      fontWeight: 700,
      fontSize: '16px',
      textAlign: 'left' as const, // Căn phải để label và input đều hàng
    },
    input: {
      flex: 1,
      maxWidth: '360px !important',
      height: '40px',
      border: '1px solid #ccc',
      borderRadius: '12px',
      padding: '4px 8px',
      fontSize: '14px',
      backgroundColor: '#F2F2F2',
    },
    select: {
      width: '109px',
      height: '40px',
      border: '1px solid #ccc' as const,
      borderRadius: '12px',
      padding: '4px 8px',
      backgroundColor: '#f5f5f5' as const,
      fontSize: '14px',
      cursor: 'pointer' as const,
      appearance: 'none' as const,
      backgroundImage: "url('/icon/chevron_big_down.png')",
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right 10px center',
      backgroundSize: '22px',
    },
    select2: {
      width: '360px',
      height: '40px',
      border: '1px solid #ccc' as const,
      borderRadius: '12px',
      padding: '4px 8px',
      backgroundColor: '#f5f5f5' as const,
      fontSize: '14px',
      cursor: 'pointer' as const,
      appearance: 'none' as const,
      backgroundImage: "url('/icon/chevron_big_down.png')",
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right 10px center',
      backgroundSize: '22px',
    },
    select3: {
      width: '360px',
      height: '40px',
      border: '1px solid #ccc' as const,
      borderRadius: '12px',
      padding: '4px 8px',
      backgroundColor: '#f5f5f5' as const,
      fontSize: '14px',
      cursor: 'pointer' as const,
      appearance: 'none' as const,
    },
    dateInputContainer: {
      position: 'relative' as const,
    },
    dateInput: {
      width: '360px',
      height: '40px',
      border: '1px solid #ccc' as const,
      borderRadius: '12px',
      padding: '4px 40px 4px 8px', // Chừa chỗ cho icon
      fontSize: '14px',
      backgroundColor: '#f5f5f5',
      color: '#888',
      backgroundImage: "url('/icon/u_calendar-alt.png')",
      backgroundSize: '22px',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right 10px center',
      outline: 'none',
      cursor: 'pointer',
    },
    dualSelectContainer: {
      display: 'flex',
      gap: '8px',
    },
    dualSelect: {
      flex: 1,
      height: '40px',
      width: '103px',
      border: '1px solid #ccc' as const,
      borderRadius: '12px',
      padding: '4px 8px',
      backgroundColor: '#f5f5f5',
      fontSize: '14px',
      cursor: 'pointer' as const,
      appearance: 'none' as const,
      backgroundImage: "url('/icon/chevron_big_down.png')",
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right 10px center',
      backgroundSize: '22px',
    },
    checkboxContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
  };

  const gender: Option[] = [
    { id: 100, value: 'Nam' },
    { id: 50, value: 'Nữ' },
    { id: 30, value: 'Khác' },
  ];

  const nienKhoa: Option[] = [
    { id: 100, value: '2020-2021' },
    { id: 50, value: '2021-2022' },
    { id: 30, value: '2022-2023' },
  ];

  const status: Option[] = [
    { id: 100, value: 'Đang theo học' },
    { id: 50, value: 'Đã chuyển lớp' },
    { id: 30, value: 'Đã chuyển trường' },
    { id: 30, value: 'Đã thôi học' },
  ];

  const hinhThuc: Option[] = [
    { id: 100, value: 'Trúng tuyển' },
    { id: 50, value: 'Đang theo học' },
  ];

  const lop: Option[] = [
    { id: 100, value: '7A' },
    { id: 50, value: '8A' },
  ];

  const khoi: Option[] = [
    { id: 100, value: '7' },
    { id: 50, value: '8' },
  ];

  return (
    <div style={styles.container}>
      <nav style={styles.nav}>
        <ol style={styles.breadcrumbList}>
          <li style={styles.inactiveText}>Hồ sơ học viên</li>
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none" style={styles.svgArrow}>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.08096 19.9547C8.56911 20.4429 9.36057 20.4429 9.84873 19.9547L16.9198 12.8837C17.408 12.3955 17.408 11.6041 16.9198 11.1159L9.84873 4.04483C9.36057 3.55667 8.56912 3.55667 8.08096 4.04483C7.59281 4.53298 7.5928 5.32444 8.08096 5.8126L13.7378 11.4694C14.0307 11.7623 14.0307 12.2372 13.7378 12.5301L8.08096 18.187C7.59281 18.6751 7.5928 19.4666 8.08096 19.9547Z"
              fill={styles.arrowColor}
            />
          </svg>
          <li style={styles.activeText}>Thêm học viên</li>
        </ol>
      </nav>

      <div style={styles.headerBackground}>Thông tin chung</div>

      <div style={styles.content}>
        <div style={styles.leftColumn}>
          <svg style={styles.avatar} width="180" height="180" viewBox="0 0 232 232" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_2255_69795)">
              <rect width="232" height="232" rx="116" fill="#EFEFEF" />
              <g clip-path="url(#clip1_2255_69795)">
                <path
                  d="M116.013 65C90.0127 65 68.7588 86.2539 68.7588 112.254C68.7588 138.254 90.0127 159.508 116.013 159.508C142.013 159.508 163.267 138.254 163.267 112.254C163.267 86.2539 142.013 65 116.013 65Z"
                  fill="#E1E1E1"
                />
                <path
                  d="M197.108 197.444C195.87 194.349 194.219 191.46 192.362 188.777C182.87 174.745 168.219 165.46 151.711 163.19C149.648 162.984 147.378 163.396 145.727 164.634C137.06 171.031 126.743 174.333 116.013 174.333C105.282 174.333 94.9651 171.031 86.2983 164.634C84.6474 163.396 82.3775 162.777 80.3142 163.19C63.8062 165.46 48.9492 174.745 39.6636 188.777C37.8065 191.46 36.1555 194.555 34.9177 197.444C34.2988 198.682 34.505 200.127 35.1239 201.365C36.7748 204.254 38.8381 207.143 40.6952 209.619C43.584 213.54 46.6794 217.047 50.1874 220.349C53.0762 223.238 56.3777 225.92 59.6796 228.603C75.981 240.778 95.5844 247.174 115.807 247.174C136.029 247.174 155.632 240.777 171.934 228.603C175.235 226.127 178.537 223.238 181.426 220.349C184.727 217.047 188.029 213.539 190.918 209.619C192.981 206.936 194.839 204.254 196.489 201.365C197.521 200.127 197.727 198.682 197.108 197.444Z"
                  fill="#E1E1E1"
                />
              </g>
            </g>
            <defs>
              <clipPath id="clip0_2255_69795">
                <rect width="232" height="232" rx="116" fill="white" />
              </clipPath>
              <clipPath id="clip1_2255_69795">
                <rect width="182" height="182" fill="white" transform="translate(25 65)" />
              </clipPath>
            </defs>
          </svg>
        </div>

        <div style={styles.rightColumn}>
          {/* Form nhập thông tin học viên */}
          <h6 style={styles.title}>Thông tin học viên</h6>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={styles.inputs}>
              {/* Họ và tên */}
              <div style={styles.field}>
                <label style={styles.label} htmlFor="fullname">
                  Họ và tên:
                </label>
                <input type="text" id="fullname" style={styles.input} />
              </div>

              {/* Giới tính */}
              <div style={styles.field}>
                <label style={styles.label} htmlFor="gender">
                  Giới tính:
                </label>

                <Dropdown options={gender} state="normal" width="w-full" />
              </div>

              {/* Ngày sinh */}
              <div style={styles.field}>
                <label style={styles.label} htmlFor="dob">
                  Ngày sinh:
                </label>
                <div style={styles.dateInputContainer}>
                  <input type="date" id="dob" style={styles.dateInput} />
                </div>
              </div>

              <div style={styles.field}>
                <label style={styles.label} htmlFor="fullname">
                  Nơi sinh:
                </label>
                <input type="text" id="placebirthr" style={styles.input} />
              </div>

              <div style={styles.field}>
                <label style={styles.label} htmlFor="fullname">
                  Dân tộc:
                </label>
                <input type="text" id="nation" style={styles.input} />
              </div>

              <div style={styles.field}>
                <label style={styles.label} htmlFor="fullname">
                  Tôn giáo:
                </label>
                <input type="text" id="religion" style={styles.input} />
              </div>
            </div>

            <div style={styles.inputs}>
              {/* Niên khóa */}
              <div style={styles.field}>
                <label style={styles.label} htmlFor="schoolYear">
                  Niên khóa:
                </label>
                <Dropdown options={nienKhoa} state="normal" width="w-full" />
              </div>

              {/* Khối và Lớp */}
              <div style={styles.field}>
                <label style={styles.label}>Khối:</label>
                <div style={styles.dualSelectContainer}>
                  <Dropdown options={khoi} state="normal" width="short" />

                  <Dropdown options={lop} state="normal" width="short" />
                </div>
              </div>

              {/* Mã học viên */}
              <div style={styles.field}>
                <label style={styles.label} htmlFor="studentId">
                  Mã học viên:
                </label>
                <input type="text" id="studentId" style={styles.input} disabled />
                <div style={styles.checkboxContainer}>
                  <input type="checkbox" id="autoGenerate" />
                  <label htmlFor="autoGenerate">Sinh mã tự động</label>
                </div>
              </div>

              {/* Ngày nhập học */}
              <div style={styles.field}>
                <label style={styles.label} htmlFor="enrollDate">
                  Ngày nhập học:
                </label>
                <div style={styles.dateInputContainer}>
                  <input type="date" id="enrollDate" style={styles.dateInput} />
                </div>
              </div>

              {/* Hình thức */}
              <div style={styles.field}>
                <label style={styles.label} htmlFor="studyType">
                  Hình thức:
                </label>
                <Dropdown options={hinhThuc} state="normal" width="w-full" />
              </div>

              {/* Trạng thái */}
              <div style={styles.field}>
                <label style={styles.label} htmlFor="status">
                  Trạng thái:
                </label>
                <Dropdown options={status} state="normal" width="w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.content2} className="mt-3">
        <div style={styles.leftColumn}></div>
        <div style={styles.rightColumn2}>
          <h6 style={styles.title}>Địa chỉ liên hệ</h6>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={styles.inputs}>
              <div style={styles.field}>
                <label style={styles.label} htmlFor="fullname">
                  Tỉnh/Thành phố:
                </label>
                <input type="text" id="fullname" style={styles.select3} />
              </div>

              <div style={styles.field}>
                <label style={styles.label} htmlFor="gender">
                  Quận/Huyện:
                </label>
                <input type="text" id="fullname" style={styles.select3} />
              </div>

              <div style={styles.field}>
                <label style={styles.label} htmlFor="dob">
                  Xã/Phường:
                </label>
                <input type="text" id="fullname" style={styles.select3} />
              </div>
            </div>

            <div style={styles.inputs}>
              <div style={styles.field}>
                <label style={styles.label} htmlFor="schoolYear">
                  Địa chỉ:
                </label>
                <input type="text" id="address" style={styles.select3} />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Email:</label>
                <input type="email" id="email" style={styles.select3} placeholder="example@gmail.com" />
              </div>

              {/* Mã học viên */}
              <div style={styles.field}>
                <label style={styles.label} htmlFor="studentId">
                  Điện thoại:
                </label>
                <input type="number" id="phone" style={styles.select3} placeholder="0xxxxxxxxx" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.headerBackground2}>Thông tin gia đình</div>

      <div style={styles.content3} className="mt-0">
        <div style={styles.leftColumn2}>
          <div style={{ display: 'flex', justifyContent: 'space-around', gap: '80px' }}>
            <div style={styles.inputs}>
              <div style={styles.field}>
                <label style={styles.label} htmlFor="fullname">
                  Họ tên cha:
                </label>
                <input type="text" id="fullname" style={styles.select3} />
              </div>

              <div style={styles.field}>
                <label style={styles.label} htmlFor="gender">
                  Họ tên mẹ:
                </label>
                <input type="text" id="fullname" style={styles.select3} />
              </div>

              <div style={styles.field}>
                <label style={styles.label} htmlFor="dob">
                  Họ tên giám hộ:
                </label>
                <input type="text" id="fullname" style={styles.select3} />
              </div>
            </div>

            <div style={styles.inputs}>
              <div style={styles.field}>
                <label style={styles.label} htmlFor="fullname">
                  Năm sinh bố:
                </label>
                <input type="text" id="fullname" style={styles.select3} />
              </div>

              <div style={styles.field}>
                <label style={styles.label} htmlFor="gender">
                  Năm sinh mẹ:
                </label>
                <input type="text" id="fullname" style={styles.select3} />
              </div>

              <div style={styles.field}>
                <label style={styles.label} htmlFor="dob">
                  Năm sinh GH:
                </label>
                <input type="text" id="fullname" style={styles.select3} />
              </div>
            </div>

            <div style={styles.inputs}>
              <div style={styles.field}>
                <label style={styles.label} htmlFor="fullname">
                  Nghề nghiệp bố:
                </label>
                <input type="text" id="fullname" style={styles.select3} />
              </div>

              <div style={styles.field}>
                <label style={styles.label} htmlFor="gender">
                  Nghề nghiệp mẹ:
                </label>
                <input type="text" id="fullname" style={styles.select3} />
              </div>

              <div style={styles.field}>
                <label style={styles.label} htmlFor="dob">
                  Nghề nghiệp GH:
                </label>
                <input type="text" id="fullname" style={styles.select3} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.content3} className="mt-0">
        {/* <div style={styles.leftColumn}></div> */}
        <div style={styles.rightColumn2}>
          <h6 style={styles.title}>Liên lạc gia đình</h6>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={styles.inputs}>
              <div style={styles.field}>
                <label style={styles.label} htmlFor="fullname">
                  Điện thoại cha:
                </label>
                <input type="number" id="fullname" style={styles.select3} />
              </div>
            </div>

            <div style={styles.inputs}>
              <div style={styles.field}>
                <label style={styles.label} htmlFor="fullname">
                  Điện thoại mẹ:
                </label>
                <input type="number" id="fullname" style={styles.select3} />
              </div>
            </div>

            <div style={styles.inputs}>
              <div style={styles.field}>
                <label style={styles.label} htmlFor="fullname">
                  Điện thoại GH:
                </label>
                <input type="number" id="fullname" style={styles.select3} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="content flex gap-5 p-7 justify-center">
        <Button label="Hủy" size="big" variant="solid" onClick={() => {}} backgroundColor="#F2F2F2" textColor="#000" hoverCursor="pointer" />

        <Button
          label="Lưu"
          size="big"
          variant="solid"
          hoverBackgroundColor="#FF7506"
          backgroundColor="#C9C4C0"
          hoverCursor="pointer"
          onClick={() => {}}
        />
      </div>

      {/* <Dropdown options={options} state="normal" width='w-full' /> */}
    </div>
  );
};

export default AddProfileStudent;
