import {IRFormProps, IRListProps} from '@mcfed/crud';

export interface ApiResData<T> {
  code: number;
  msg: string;
  data: T;
}

interface DictItem {
  label: string;
  value: string;
}

type Dicts = {
  (key: string, value: string): string;
  (key: string): DictItem[];
};

interface BasicPageProps {
  dicts: Dicts;
  appReducer: any;
}

export interface BaseFormViewProps extends IRFormProps, BasicPageProps {
  spins: (action: Function | string) => boolean;
  querys: (action: Function | string) => boolean;
  locale: (type: string, vars?: any) => string;
}

export interface BaseListViewProps extends IRListProps, BasicPageProps {
  spins: (action: Function | string) => boolean;
  querys: (action: Function | string) => boolean;
  locale: (type: string, vars?: any) => string;
}
