// Copyright 2017-2020 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Observable } from '@polkadot/x-rxjs';
import type { ApiInterfaceRx } from '@polkadot/api/types';
import type { DeriveStakingWaiting } from '@polkadot/api-derive/types';

import { combineLatest } from '@polkadot/x-rxjs';
import { map, switchMap } from '@polkadot/x-rxjs/operators';

import { memo } from '@polkadot/api-derive/util';
import {DeriveStakingQuery} from "@polkadot/react-api/staking/types";

export function waitingInfo (instanceId: string, api: ApiInterfaceRx): () => Observable<DeriveStakingWaiting> {
  return memo(instanceId, (): Observable<DeriveStakingWaiting> =>
    combineLatest([
      api.derive.staking.validators(),
      api.derive.staking.stashes()
    ]).pipe(
      switchMap(([{ nextElected }, stashes]): Observable<DeriveStakingWaiting> => {
        const elected = nextElected.map((a) => a.toString());
        const waiting = stashes.filter((v) => !elected.includes(v.toString()));

        // @ts-ignore
          return api.derive.staking.queryMulti(waiting, { withLedger: true, withPrefs: true }).pipe(
          map((info: DeriveStakingQuery[]): DeriveStakingWaiting => ({
            info,
            waiting
          }))
        );
      })
    )
  );
}
