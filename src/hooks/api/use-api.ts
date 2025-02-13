import { useEffect, useState, useCallback } from 'react';
import { AxiosResponse, RawAxiosRequestConfig } from 'axios';

export type ApiResponse<TData, TRequest> = {
    data: TData | null;
    loading: boolean;
    error: Error | null;
    fetch: (params: TRequest) => Promise<TData>;
    refetch: () => Promise<TData | null>;    
    download: (params: TRequest) => Promise<ArrayBuffer>;      
};

type ApiMethod<TData, TRequest> = (requestParameters: TRequest, options?: RawAxiosRequestConfig) => Promise<AxiosResponse<TData>>;

const useApi = <TData, TRequest>(
    api: any, method: ApiMethod<TData, TRequest>
  ): ApiResponse<TData, TRequest> => {
    const [data, setData] = useState<TData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [params, setParams] = useState<TRequest>();

    const fetch = useCallback(async (params: TRequest): Promise<TData> => {
      setLoading(true);
      setError(null);
      setParams(params);

      try {
        const response = await api[method.name](params);
        // console.log("API Response:", response.data);
        setData(response.data);
        return response.data;
      } catch (err) {
        console.error("API Error:", err);
        setError(err as Error);
        throw err;
      } finally {
        setLoading(false);
      }
    }, [api, method]);

    const download  = useCallback(async (params: TRequest): Promise<ArrayBuffer> => {
      setLoading(true);
      setError(null);
      setParams(params);

      try {
        const response = await api[method.name](params,{
          responseType: 'arraybuffer',
        });
        // let response_data: ArrayBuffer = response  as ArrayBuffer;
        // if (response_data instanceof ArrayBuffer) {
        //   // const blob = new Blob([defineAgreementsExport]);
        //   var file = new Blob([response], {type: 'application/pdf'});
        //   const url = URL.createObjectURL( file );
        //   window.open(url, '_blank');
        // } else {
        //   console.error('Response data is not an ArrayBuffer');
        // }
        // console.log("API Response:", response.data);
        // setData(response.data);
        return response.data;
      } catch (err) {
        console.error("API Error:", err);
        setError(err as Error);
        throw err;
      } finally {
        setLoading(false);
      }
    }, [api, method]);
  
    const refetch = useCallback(async (): Promise<TData | null> => {
      if (params) {
        return fetch(params);
      }
      return null;
    }, [fetch, params]);
  
    return { data, loading, error, fetch, refetch, download };
  };
  
  export default useApi;