import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { faCog, faHashtag, faPlusCircle, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import SidebarFooter from './sidebar-footer';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Dropdown from '../../utils/dropdown';
import { openedModal } from '../../../store/ui';
import CreateInvite from '../../modals/create-invite';

import './sidebar-content.scoped.css';

const SidebarContent: React.FunctionComponent = () => {  
  const dispatch = useDispatch();
  const ui = useSelector((s: Store.AppStore) => s.ui);
  
  const channels = ui.activeGuild?.channels.map(c => (
    <Link
      key={c.id}
      style={{height: '34px'}}
      to={`/channels/${ui.activeGuild!.id}/${c.id}`}
      className={`
        cursor-pointer flex items-center rounded p-2 pl-3
        ${c.id === ui.activeChannel?.id && 'active'}`}>
      <FontAwesomeIcon
        className="float-left mr-2 scale-150 muted fill-current"
        icon={faHashtag} />
      <span>{c.name}</span>
    </Link>
  ));

  const openCreateInvite = () => dispatch(openedModal({
    typeName: CreateInvite.name,
  }));
  
  // guild sidebar content
  return (
    <div className="flex flex-col sidebar-content bg-bg-secondary">
      <div className="sidebar-header pl-2.5 pr-4">
        {ui.activeGuild && (
          <Dropdown title={ui.activeGuild.name}>
            <a className="rounded-sm flex items-center justify-between p-2 h-8 text-sm"
              onClick={openCreateInvite}>
              <span className="primary">Invite people</span>
              <FontAwesomeIcon
                className="float-right w-1"
                icon={faUserPlus} />
            </a>

            <a className="rounded-sm flex items-center justify-between p-2 h-8 text-sm"
              onClick={openCreateInvite}>
              <span className="font">Create channel</span>
              <FontAwesomeIcon
                className="float-right w-1"
                icon={faPlusCircle} />
            </a>

            <Link
              to={`/channels/${ui.activeGuild.id}/settings`}
              className="rounded-sm flex items-center justify-between p-2 h-8 text-sm"
              onClick={openCreateInvite}>
              <span className="font">Server settings</span>
              <FontAwesomeIcon
                className="float-right w-1"
                icon={faCog} />
            </Link>
          </Dropdown>
        )}
      </div>
      <div className="sidebar-details flex-grow px-2">
        <div className="h-4" />
        {channels}
      </div>
      <SidebarFooter />
      <CreateInvite />
      <CreateChannel />
    </div>
  );
}
 
export default SidebarContent;