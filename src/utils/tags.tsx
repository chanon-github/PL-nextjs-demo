import { Tag } from 'antd';
import { CSSProperties } from 'react';

interface TagCustomProps {
  status: 'draft' | 'inprocess' | 'finish' | 'inActive' | 'active' | 'complete' | 'assignpersonnel';
}

export const TagCustom = (props: TagCustomProps) => {
  const theme: Record<TagCustomProps['status'], { text: string; style: CSSProperties }> = {
    draft: {
      text: 'สร้างแล้ว',
      style: {
        color: '#f3ab58',
        backgroundColor: '#fff5e9',
        borderRadius: '20px',
        border: 'none',
        paddingRight: 20,
        paddingLeft: 20,
        paddingTop: 4,
        paddingBottom: 4,
      },
    },
    assignpersonnel: {
      text: 'กำหนดรายชื่อ',
      style: {
        color: '#34B233',
        backgroundColor: '#DCFFDC',
        borderRadius: '20px',
        border: 'none',
        paddingRight: 20,
        paddingLeft: 20,
        paddingTop: 4,
        paddingBottom: 4,
      },
    },
    inprocess: {
      text: 'กำลังดำเนินการ',
      style: {
        color: '#d67fd6',
        backgroundColor: '#ffd1ff',
        borderRadius: '20px',
        border: 'none',
        paddingRight: 20,
        paddingLeft: 20,
        paddingTop: 4,
        paddingBottom: 4,
      },
    },
    complete: {
      text: 'Complete',
      style: {
        color: '#34B233',
        backgroundColor: '#DCFFDC',
        borderRadius: '20px',
        border: 'none',
        paddingRight: 20,
        paddingLeft: 20,
        paddingTop: 4,
        paddingBottom: 4,
      },
    },
    finish: {
      text: 'เสร็จสิ้น',
      style: {
        color: '#34B233',
        backgroundColor: '#DCFFDC',
        borderRadius: '20px',
        border: 'none',
        paddingRight: 20,
        paddingLeft: 20,
        paddingTop: 4,
        paddingBottom: 4,
      },
    },
    inActive: {
      text: 'Inactive',
      style: {
        color: '#ff2929',
        backgroundColor: '#ffd1d1',
        borderRadius: '20px',
        border: 'none',
        paddingRight: 20,
        paddingLeft: 20,
        paddingTop: 4,
        paddingBottom: 4,
      },
    },
    active: {
      text: 'Active',
      style: {
        color: '#34B233',
        backgroundColor: '#DCFFDC',
        borderRadius: '20px',
        border: 'none',
        paddingRight: 20,
        paddingLeft: 20,
        paddingTop: 4,
        paddingBottom: 4,
      },
    }
  };

  const selectedTheme = theme[props.status];
  if (!selectedTheme) {
    return <Tag>unknown status</Tag>;
  }
  const { style, text } = selectedTheme;

  return <Tag style={style}>{text}</Tag>;
};
