// Copyright 2017-2020 @polkadot/react-components authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { StorageEntryBase } from '@polkadot/api/types';
import { ModuleConstantMetadataV12 } from '@polkadot/types/interfaces';
import type { AnyTuple } from '@polkadot/types/types';

export type StorageEntryPromise = StorageEntryBase<'promise', any, AnyTuple>;
export interface ConstValueBase {
  method: string;
  section: string;
}

export interface ConstValue extends ConstValueBase {
  meta: ModuleConstantMetadataV12;
}
