// Copyright 2017-2020 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Observable } from '@polkadot/x-rxjs';
import type { ApiInterfaceRx } from '@polkadot/api/types';
import type { AccountId } from '@polkadot/types/interfaces';

import { map } from '@polkadot/x-rxjs/operators';

import { memo } from '@polkadot/api-derive/util';

/**
 * @description Retrieve the list of all validator stashes
 */
export function stashes (instanceId: string, api: ApiInterfaceRx): () => Observable<AccountId[]> {
  return memo(instanceId, (): Observable<AccountId[]> =>
    api.query.staking.validators.keys().pipe(
      map((keys) => keys.map((key) => key.args[0] as AccountId).filter((a) => a))
    )
  );
}
