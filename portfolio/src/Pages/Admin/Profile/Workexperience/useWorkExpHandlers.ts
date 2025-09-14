
import { message } from 'antd';
import type { AxiosError } from 'axios';

import { useWorkexp } from '@/Hook/usegetWorkexp';

import { useDeleteWorkexp } from '../Hook/useDeleteWorkexp';
import { useCreateWorkexp } from '../Hook/useCreateWorkexp';
import { useCreateTask } from '../Hook/useCreateTask';
import { useDeleteTask, useEditTask } from '../Hook/useEditTask';

import {
  WorkExp,
  WorkExperiencePayload,
  WorkExperienceUpdateRs,
  WorkExpTaskCreate,
} from '@/Interface/TWorkExp';
import { useUpdateWorkexp } from '../Hook/ useUpdateWorkexp';

// Helper: lấy message từ AxiosError 
const getErrMsg = (err: unknown, fallback: string) => {
  const e = err as AxiosError<{ msg?: string; message?: string }>;
  return e?.response?.data?.msg || e?.response?.data?.message || fallback;
};

export const useWorkExpHandlers = (accessToken: string, pageIndex: number = 1) => {
  // List WorkExp
  const { data, isLoading, refetch } = useWorkexp(accessToken, pageIndex); 

  // WorkExp mutations
  const { mutate: updateWorkExp, isPending: isUpdating } = useUpdateWorkexp(accessToken);
  const { mutate: deleteWorkExp, isPending: isDeleting } = useDeleteWorkexp(accessToken);
  const { mutate: createWorkExp, isPending: isCreating } = useCreateWorkexp(accessToken);

  // Task mutations
  const { mutate: createTask, isPending: isCreatingTask } = useCreateTask(accessToken);
  const { mutate: editTask, isPending: isUpdatingTask } = useEditTask(accessToken);
  const { mutate: removeTask, isPending: isDeletingTask } = useDeleteTask(accessToken);

  //  WORKEXP 

  // UPDATE WORK 
  const handleUpdate = (values: WorkExp) => {
    const { we_id, ...payload } = values;

    const normalizedPayload: WorkExperiencePayload = {
      company_name: payload.company_name,
      position: payload.position,
      duration: payload.duration,
      description: payload.description,
      project_id: payload.project_id ?? '', 
    };

    updateWorkExp(
      { we_id, payload: normalizedPayload },
      {
        onSuccess: (res: WorkExperienceUpdateRs) => {
          message.success(res?.msg || 'Cập nhật thành công!');
          refetch();
        },
        onError: (err: unknown) => message.error(getErrMsg(err, 'Cập nhật thất bại!')),
      }
    );
  };

  // DELETE WORK 
  const handleDelete = (we_id: string, tasksLength: number) => {
    if (tasksLength > 0) {
      message.warning(' Bạn cần xoá hết các Task trước khi xoá Work Experience này.');
      return;
    }

    deleteWorkExp(we_id, {
      onSuccess: (res: WorkExperienceUpdateRs) => {
        message.success(res?.msg || 'Xoá thành công!');
        refetch();
      },
      onError: (err: unknown) => message.error(getErrMsg(err, 'Xoá thất bại!')),
    });
  };

  // CREATE WORK 
  const handleCreate = (values: WorkExperiencePayload, onDone?: () => void) => {
    const normalizedPayload: WorkExperiencePayload = {
      ...values,
      project_id: values.project_id ?? '', 
    };

    createWorkExp(normalizedPayload, {
      onSuccess: (res: WorkExperienceUpdateRs) => {
        message.success(res?.msg || 'Tạo mới thành công!');
        message.info(' Bây giờ bạn có thể thêm các Task cho Work Experience này.');
        refetch();
        onDone?.();
      },
      onError: (err: unknown) => message.error(getErrMsg(err, 'Tạo mới thất bại!')),
    });
  };

  // TASKS 

  // UPDATE 1 task 
  const handleUpdateTask = (we_id: string, mt_id: string, task_description: string) => {
    editTask(
      { we_id, body: { myTask_id: mt_id, task_description } },
      {
        onSuccess: (res: WorkExperienceUpdateRs) => {
          message.success(res?.msg || 'Cập nhật task thành công!');
          refetch();
        },
        onError: (err: unknown) => message.error(getErrMsg(err, 'Cập nhật task thất bại!')),
      }
    );
  };

  // DELETE 1 task 
  const handleDeleteTask = (_we_id: string, mt_id: string) => {
    removeTask(
      { mt_id },
      {
        onSuccess: (res: WorkExperienceUpdateRs) => {
          message.success(res?.msg || 'Xoá task thành công!');
          refetch();
        },
        onError: (err: unknown) => message.error(getErrMsg(err, 'Xoá task thất bại!')),
      }
    );
  };

  // CREATE nhiều task 
  const handleCreateTasks = (
    we_id: string,
    values: { dynamicTasks?: WorkExpTaskCreate[] }
  ) => {
    const tasks = values.dynamicTasks?.filter((t) => t?.task_description?.trim()) || [];
    if (!tasks.length) {
      message.warning('Vui lòng nhập ít nhất 1 task.');
      return;
    }

    tasks.forEach((t) => {
      createTask(
        { we_id, body: t }, 
        {
          onSuccess: (res: WorkExperienceUpdateRs) =>
            message.success(res?.msg || 'Tạo task thành công!'),
          onError: (err: unknown) => message.error(getErrMsg(err, 'Tạo task thất bại!')),
        }
      );
    });
  };

  return {
    data,
    isLoading,
    refetch,

    // loading states
    isCreating,
    isUpdating,
    isDeleting,
    isCreatingTask,
    isUpdatingTask,
    isDeletingTask,

    // handlers
    handleCreate,
    handleUpdate,
    handleDelete,
    handleCreateTasks,
    handleUpdateTask,
    handleDeleteTask,
  };
};
