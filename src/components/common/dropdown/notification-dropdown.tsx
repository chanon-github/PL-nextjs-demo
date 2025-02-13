import { BellOutlined, FileDoneOutlined } from '@ant-design/icons';
import { Avatar, Badge, Dropdown, MenuProps, Progress, theme } from 'antd';
import React, { ReactElement, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// import { UseCMSRunningJobHook } from 'src/hooks/api/cms-runningJob';
// import { JobStatusDto } from 'src/services/rest-api/generated';

const { useToken } = theme;

export const NotificationsMenus = (props: NotificationProps): ReactElement => {
  const { token } = useToken();
  const [open, setOpen] = useState<boolean>(false);
  const [itemList, setItemList] = useState<MenuProps['items']>();
  const [notificationCount, setNotificationCount] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  // const { data, refetch } = UseCMSRunningJobHook({});
  const refreshJobAt = useSelector((state: any) => state.isCollapse.refreshJobAt);

  // useEffect(() => {
  //   if (refreshJobAt) {
  //     refetch();
  //   }
  // }, [refreshJobAt]);

  // useEffect(() => {
  //   if (data) {
  //     setNotificationCount(data.length);
  //     if (data.length > notificationCount) {
  //       setIsAnimating(true);
  //       setTimeout(() => setIsAnimating(false), 5000);
  //       setTimeout(() => setOpen(true), 200);
  //     }

  //     const itemsList = generate(data);
  //     if (itemsList) {
  //       setItemList(itemsList);
  //     }
  //   }
  // }, [data]);

  const generate = (data: Array<any>): MenuProps['items'] => {
    return data?.map((eactItem: any) => ({
      key: eactItem.code,
      label: (
        <div className=" text-[14px] font-semibold w-full  pr-2 pl-2 w-full flex flex-col space-x-0">
          <span className="w-[fit-content]">{`${eactItem.jobName}`}</span>
          {eactItem.failCount > 0 && (
            <span className=" text-[14px] font-thin flex text-red-500 text-left">{`failed: ${eactItem.failCount} / ${eactItem.totalCount}`}</span>
          )}
        </div>
      ),
      icon: (
        <div className=" pr-2">
          <Progress
            type="circle"
            strokeWidth={10}
            width={30}
            percent={eactItem?.progress}
            format={(percent) => <div className="text-[8px]">{`${percent?.toFixed(0)} %`}</div>}
          />
        </div>
      ),
      style: { alignItems: 'stretch', wordBreak: 'break-word', padding: 8 },
    }));
  };

  const contentStyle: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
    maxWidth: 300,
    height: 'fit-content',
  };

  const menuStyle: React.CSSProperties = {
    boxShadow: 'none',
  };

  return notificationCount == 0 ? (
    <div />
  ) : (
    <Dropdown
      open={open}
      onOpenChange={setOpen}
      menu={{ items: itemList }}
      placement={'bottomRight'}
      dropdownRender={(menu: any) => {
        return itemList && itemList?.length > 0 ? (
          <div style={contentStyle}>{React.cloneElement(menu as React.ReactElement, { style: menuStyle })}</div>
        ) : (
          <div
            style={{
              backgroundColor: token.colorBgElevated,
              borderRadius: token.borderRadiusLG,
              boxShadow: token.boxShadowSecondary,
              padding: 12,
              maxWidth: 300,
            }}
            className="space-x-2"
          >
            <FileDoneOutlined className="text-[#535455]" />
            <span className="text-[#535455] pl-4 ">{'ไม่พบข้อมูล task-job '}</span>
          </div>
        );
      }}
    >
      <Badge count={notificationCount}>
        <Avatar shape="square" className={isAnimating ? 'animate-bounce' : ''} icon={<BellOutlined />} />
      </Badge>
    </Dropdown>
  );
};

interface NotificationProps {}
