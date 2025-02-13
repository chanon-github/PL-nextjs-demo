import { Dispatch } from 'react';

let allowPermission: AllowPermission = {
  hasCreateButton: false,
  hasEditButton: false,
  hasDeleteButton: false,

  /*--default All Logged In User--*/
  hasMetricsButton: true,
  hasViewButton: true,
  metricsButton: true,
  saveMetricsButton: true,
  approveButton: true,
  approveAllButton: true,
  rejectButton: true,
  requestApproveButton: true,
  assesorAppointmentButton: true,
  isShowApproveAllButton: false,
  isShowChangeLeaderButton: false,
  /*--------------------------*/
  appointmentButton: false,
  deleteMetricsButton: false,
  selectAssessorButton1: false,
  selectAssessorButton2: false,
  addAssessorButton2: false,
  appointmentAssessorButton2: false,
  leaderAcceptanceNameListButton: false,
  selectAssessorButton3: false,
  addAssessorButton3: false,
  appointmentAssessorButton3: false,
  staffAcceptanceNameListButton: false,
  importTemplatesButton: false,
  deanAcceptanceNameListButton: false,
  lastImportTemplatesButton: false,
  createButton: false,
  deleteButton: false,
  editButton: false,
  goalApproveButton: false,
  goalCommentButton: false,
  hiddenSyncButton: false,
  hiddenImportButton: false,
  hiddenCreationButton: false,
  hiddenEditButton: false,
  hiddenDeleteButton: false,
  hiddenViewButton: false,
  hiddenImportListAppointmentAssessorButton: false,
  isShowButtonUpdateAssessor1: false,
  isShowButtonDeanApprove: false,
};

const permissionActionAppraisal: Permission = {
  'PmsBe.Metrics.UpdateAssessor1': {
    isShowButtonUpdateAssessor1: true,
  },
  'PmsBe.Metrics.DeanApprove': {
    isShowButtonDeanApprove: true,
  },
  'PmsBe.Personnel': {
    hiddenSyncButton: true,
    hiddenImportButton: true,
    hiddenCreationButton: false,
    hiddenEditButton: true,
    hiddenDeleteButton: true,
    hiddenViewButton: true,
  },
  'PmsBe.Personnel.AdminHR': {
    hiddenSyncButton: true,
    hiddenImportButton: true,
    hiddenCreationButton: false,
    hiddenEditButton: true,
    hiddenDeleteButton: true,
    hiddenViewButton: true,
  },
  'PmsBe.Personnel.AdminFunction': {
    hiddenSyncButton: false,
    hiddenImportButton: false,
    hiddenCreationButton: false,
    hiddenEditButton: false,
    hiddenDeleteButton: false,
    hiddenViewButton: true,
  },
  'PmsBe.Appraisals': {
    hasCreateButton: true,
    hasEditButton: true,
    hasDeleteButton: true,
    hiddenImportListAppointmentAssessorButton: true,
  },
  'PmsBe.Appraisals.AdminHR': {
    hasCreateButton: true,
    hasEditButton: true,
    hasDeleteButton: true,

    hiddenSyncButton: true,
    hiddenImportButton: true,
    hiddenCreationButton: false,
    hiddenEditButton: true,
    hiddenDeleteButton: true,
    hiddenViewButton: true,
    hiddenImportListAppointmentAssessorButton: true,
  },
  'PmsBe.Appraisals.AdminFunction': {
    hasCreateButton: true,
    hasEditButton: true,
    hasDeleteButton: true,

    hiddenSyncButton: true,
    hiddenImportButton: true,
    hiddenCreationButton: false,
    hiddenEditButton: true,
    hiddenDeleteButton: true,
    hiddenViewButton: true,
    hiddenImportListAppointmentAssessorButton: true,
  },
  'PmsBe.Metrics': {
    deleteMetricsButton: true,
    metricsButton: true,
    importTemplatesButton: true,
    lastImportTemplatesButton: true,
    createButton: true,
    deleteButton: true,
    editButton: true,
    saveMetricsButton: true,
    approveButton: true,
    approveAllButton: true,
    rejectButton: true,
    requestApproveButton: true,
    goalApproveButton: true,
    goalCommentButton: true,
  },
  'PmsBe.Metrics.AdminHR': {
    deleteMetricsButton: true,
    metricsButton: true,
    importTemplatesButton: true,
    lastImportTemplatesButton: true,
    createButton: true,
    deleteButton: true,
    editButton: true,
    saveMetricsButton: true,
    approveButton: true,
    approveAllButton: true,
    rejectButton: true,
    requestApproveButton: true,
    goalApproveButton: true,
    goalCommentButton: true,

    //--- * attribute control metric *---//
    hiddenFootBarSaveForDraftData: false,
    hiddenFootBarApproveForLeaderData: true,
    hiddenImportTemplate: true,
    hiddenLastApproveTemplate: true,
    hiddenSaveCoreFormButton: true,

    hiddenCreatedMissionsButton: true,
    hiddenCreatedAgreementButton: true,
    hiddenCreatedIndicatorButton: true,
    hiddenCreatedGoalButton: true,
    hiddenDeleteMissionsButton: true,
    hiddenDeleteAgreementButton: true,
    hiddenDeleteIndicatorButton: true,
    hiddenDeleteGoalButton: true,
    disabledApproveButton: false,
    disabledComment: false,
    disabledNumberInput: true,
    disabledSelectType: true,
    disabledSelectApprove: false,
    disabledTextArea: true,
    disabledDate: true,
    disabledScoreCriteria: false,
    hiddenSaveMetricsButton: true,
  },
  'PmsBe.Metrics.AdminFunction': {
    deleteMetricsButton: true,
    metricsButton: false,
    importTemplatesButton: true,
    lastImportTemplatesButton: true,
    createButton: true,
    deleteButton: true,
    editButton: true,
    saveMetricsButton: true,
    approveButton: true,
    approveAllButton: true,
    rejectButton: true,
    requestApproveButton: true,
    goalApproveButton: true,
    goalCommentButton: true,

    //--- * attribute control metric *---//
    hiddenFootBarSaveForDraftData: false,
    hiddenFootBarApproveForLeaderData: true,
    hiddenImportTemplate: true,
    hiddenLastApproveTemplate: true,
    hiddenSaveCoreFormButton: true,

    hiddenCreatedMissionsButton: true,
    hiddenCreatedAgreementButton: true,
    hiddenCreatedIndicatorButton: true,
    hiddenCreatedGoalButton: true,
    hiddenDeleteMissionsButton: true,
    hiddenDeleteAgreementButton: true,
    hiddenDeleteIndicatorButton: true,
    hiddenDeleteGoalButton: true,
    disabledApproveButton: false,
    disabledComment: false,
    disabledNumberInput: true,
    disabledSelectType: true,
    disabledSelectApprove: false,
    disabledTextArea: true,
    disabledDate: true,
    disabledScoreCriteria: false,
    hiddenSaveMetricsButton: true,
  },

  'PmsBe.MetriceAssessors': {
    selectAssessorButton1: true,
    addAssessorButton2: true,
    selectAssessorButton2: true,
    appointmentAssessorButton2: true,
    addAssessorButton3: true,
    selectAssessorButton3: true,
    appointmentAssessorButton3: true,
    leaderAcceptanceNameListButton: true,
    staffAcceptanceNameListButton: true,
    deanAcceptanceNameListButton: false,
  },
};

export const UseAuthPermissions = (props: PermissionProps): { allowPermission: AllowPermission } => {
  // get resource permissions
  const { permission } = props;
  if (permission) {
    permission.forEach((eachPermission: string) => {
      //check role is dean ?
      if (eachPermission === 'PmsBe.Metrics.Dean') {
        props.dispatch({ type: 'SET_DEAN', payload: { isDean: true } });
      } else {
        props.dispatch({ type: 'SET_DEAN', payload: { isDean: false } });
      }

      if (['PmsBe.Metrics', 'PmsBe.Metrics.AdminHR', 'PmsBe.Metrics.AdminFunction'].includes(eachPermission)) {
        props.dispatch({ type: 'SET_ADMIN', payload: { isAdmin: true } }); // ตรวจเฉพาะภายในชุดชี้วัดเท่านั้น
      }

      const found: any = permissionActionAppraisal[eachPermission] ?? null;
      if (found) {
        for (const permission in found) {
          if (found[permission] === true) {
            allowPermission[permission] = found[permission]; // override true only  idea "OR" concept <--
          }
        }
      }
    });
  }
  return { allowPermission: allowPermission };
};

interface PermissionProps {
  permission: any;
  dispatch: Dispatch<any>;
}

export type ButtonPermissions = {
  hasCreateButton?: boolean;
  hasEditButton?: boolean;
  hasDeleteButton?: boolean;
  hasViewButton?: boolean;
  hasMetricsButton?: boolean;
  metricsButton?: boolean;
  assesorAppointmentButton?: boolean;
  appointmentButton?: boolean;
  saveMetricsButton?: boolean;
  deleteMetricsButton?: boolean;
  requestApproveButton?: boolean;
  approveButton?: boolean;
  approveAllButton?: boolean;
  rejectButton?: boolean;
  selectAssessorButton1?: boolean;
  selectAssessorButton2?: boolean;
  addAssessorButton2?: boolean;
  appointmentAssessorButton2?: boolean;
  leaderAcceptanceNameListButton?: boolean;
  selectAssessorButton3?: boolean;
  addAssessorButton3?: boolean;
  appointmentAssessorButton3?: boolean;
  staffAcceptanceNameListButton?: boolean;
  importTemplatesButton?: boolean;
  deanAcceptanceNameListButton?: boolean;
  lastImportTemplatesButton?: boolean;
  createButton?: boolean;
  deleteButton?: boolean;
  editButton?: boolean;
  goalApproveButton?: boolean;
  goalCommentButton?: boolean;
  key?: string;
  isDean?: boolean;
  isShowChangeLeaderButton?: boolean;
  isShowApproveAllButton?: boolean;
  hiddenSyncButton?: boolean;
  hiddenImportButton?: boolean;
  hiddenCreationButton?: boolean;
  hiddenEditButton?: boolean;
  hiddenDeleteButton?: boolean;
  hiddenViewButton?: boolean;
  hiddenImportListAppointmentAssessorButton?: boolean;
  isShowButtonUpdateAssessor1?: boolean;
  isShowButtonDeanApprove?: boolean;

  /* hidden type */
  hiddenSaveMetricsButton?: boolean;
  hiddenFootBarSaveForDraftData?: boolean;
  hiddenFootBarApproveForLeaderData?: boolean;
  /*hidden description button */
  hiddenImportTemplate?: boolean;
  hiddenLastApproveTemplate?: boolean;
  /* hidden Create button*/
  hiddenSaveCoreFormButton?: boolean;
  /* hidden Create button*/
  hiddenCreatedMissionsButton?: boolean;
  hiddenCreatedAgreementButton?: boolean;
  hiddenCreatedIndicatorButton?: boolean;
  hiddenCreatedGoalButton?: boolean;
  /* hidden  Delete button*/
  hiddenDeleteMissionsButton?: boolean;
  hiddenDeleteAgreementButton?: boolean;
  hiddenDeleteIndicatorButton?: boolean;
  hiddenDeleteGoalButton?: boolean;
  /* disabled type */
  disabledNumberInput?: boolean;
  disabledSelectApprove?: boolean;
  disabledSelectType?: boolean;
  disabledApproveButton?: boolean;
  disabledComment?: boolean;
  disabledTextArea?: boolean;
  disabledDate?: boolean;
  disabledScoreCriteria?: boolean;
  /* hidden ApproveAll button */
  hiddenApproveAllButton?: boolean;
  hiddenChangeLeaderButton?: boolean;
};

type Permission = Record<string, ButtonPermissions>;

export type AllowPermission = Record<any, any>;
