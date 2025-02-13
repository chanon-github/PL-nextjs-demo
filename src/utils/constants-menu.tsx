import {
  AppstoreOutlined,
  BranchesOutlined,
  CalculatorOutlined,
  FileTextOutlined,
  OrderedListOutlined,
  UserOutlined,
} from '@ant-design/icons';
export const iconMenu: any = {
  employee: <UserOutlined />,
  management: <OrderedListOutlined />,
  organization: <UserOutlined />,
  role: <BranchesOutlined />,
  KPI: <AppstoreOutlined />,
  report: <FileTextOutlined />,
  formula: <CalculatorOutlined />,
};
const menus = [
  {
    label: 'บุคลากร',
    key: 'employee',
    children: [
      {
        label: 'ข้อมูลบุคลากร',
        key: 'PmsBe.Personnel',
        subKey: 'PmsBe.Personnel.AdminHR',
        thirdKey: 'PmsBe.Personnel.AdminFunction',
        reference: 'PmsBe.Personnel',
        link: '/infoEmployee',
      },
      {
        label: 'ประเภทการจ้าง',
        key: 'PmsBe.EmployeeGroups',
        reference: 'PmsBe.EmployeeGroups',
        link: '/employee-group-type-cms',
      },
      {
        label: 'ประเภทการจ้างย่อย',
        key: 'PmeBe.EmployeeSubgroups',
        reference: 'PmsBe.EmployeeGroups',
        link: '/employee-subgroup-type-cms',
      },
      {
        label: 'สายวิชาชีพ',
        key: 'PmsBe.ProfessionalLines',
        reference: 'PmsBe.ProfessionalLines',
        link: '/professional-line-cms',
      },
      {
        label: 'กลุ่มตำแหน่ง',
        key: 'PmsBe.PositionGroup',
        reference: 'PmsBe.Positions',
        link: '/position-group-cms',
      },
      {
        label: 'ประเภทตำแหน่ง',
        key: 'PmsBe.PositionTypes',
        reference: 'PmsBe.Positions',
        link: '/position-type-cms',
      },
      {
        label: 'ตำแหน่ง',
        key: 'PmsBe.Positions',
        reference: 'PmsBe.Positions',
        link: '/position-cms',
      },
    ],
  },
  {
    label: 'ตำแหน่งบริหาร',
    key: 'management',
    link: '/banner',
    children: [
      {
        label: 'ประเภทผู้บริหาร',
        key: 'PmeBe.ManagementTypes',
        reference: 'PmsBe.ManagementPositions',
        link: '/management-type-cms',
      },
      {
        label: 'กลุ่มผู้บริหาร',
        key: 'PmeBe.ManagementGroups',
        reference: 'PmsBe.ManagementPositions',
        link: '/management-group-cms',
      },
      {
        label: 'ตำแหน่งบริหาร',
        key: 'PmsBe.ManagementPositions',
        reference: 'PmsBe.ManagementPositions',
        link: '/management-position-cms',
      },
      {
        label: 'ผู้ดำรงตำแหน่งบริหาร',
        key: 'PmeBe.ManagementPersonnel',
        reference: 'PmsBe.ManagementPositions',
        link: '/management-personnel-cms',
      },
    ],
  },
  {
    label: 'โครงสร้างองค์กร',
    key: 'organization',
    children: [
      {
        label: 'โครงสร้างองค์กร',
        key: 'PmsBe.Organizations',
        reference: 'PmsBe.Organizations',
        link: '/organizations-cms',
      },
    ],
  },
  {
    label: 'สิทธิ์การใช้งาน',
    key: 'role',
    link: '/game',
    children: [
      {
        label: 'สิทธิ์การใช้งานบุคลากร',
        key: 'PmsBe.UserRoles',
        reference: 'PmsBe.UserRoles',
        link: '/user-role-cms',
      },
      // {
      //   label: 'การจัดการสิทธ์',
      //   key: '16-report',
      //   link: '/management-role-cms',
      // },
      {
        label: 'กลุ่มสิทธิ์',
        key: 'PmsBe.RoleGroups',
        reference: 'PmsBe.Organizations',
        link: '/role-group-cms',
      },
    ],
  },
  {
    label: 'KPI',
    key: 'KPI',
    children: [
      {
        label: 'รอบการประเมิน',
        key: 'PmsBe.Appraisals',
        reference: 'PmsBe.Appraisals',
        link: '/appraisal-cms',
      },
      {
        label: 'กลุ่มผู้ได้รับการเสนอชื่อ',
        key: 'PmsBe.AssessorPools',
        reference: 'PmsBe.AssessorPools',
        link: '/assenssorpoolsmaster-cms',
      },
      {
        label: 'ชื่อผู้ได้รับการเสนอชื่อ',
        key: 'PmsBe.AssessorPoolLists',
        reference: 'PmsBe.AssessorPools',
        link: '/assenssorpools-cms',
      },
      {
        label: 'จัดกลุ่มผู้ได้รับการเสนอชื่อ',
        key: 'PmsBe.AssessorPoolPersonnels',
        reference: 'PmsBe.AssessorPools',
        link: '/assensorpools-personnel-cms',
      },
      {
        label: 'สร้างชุดประเมิน',
        key: 'PmsBe.MetricTemplates',
        reference: 'PmsBe.MetricTemplates',
        link: '/template-cms',
      },
    ],
  },
  {
    label: 'รายงาน',
    key: 'report',
    children: [
      {
        label: 'รายงาน',
        key: 'PmsBe.Appraisals',
        reference: 'PmsBe.Reports',
        link: '/report-cms',
      },
    ],
  },
  {
    label: 'การตั้งค่า',
    key: 'formula',
    children: [
      {
        label: 'สูตรคำนวณผลประเมิน',
        key: 'PmsBe.formula',
        reference: 'PmsBe.Settings.Scoring',
        link: '/formula',
      },
    ],
  },
];

export const Constants = {
  menus,
};
