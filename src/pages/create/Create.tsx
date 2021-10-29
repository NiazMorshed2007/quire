import React, {FC, FormEvent, useContext, useState} from 'react';
import {MdClear} from 'react-icons/all';
import {useHistory, useLocation} from "react-router-dom";
import {Orgs} from "../../context/orgs";
import {Acroname} from "../../functions/Acroname";
import {setRandomAvatarBack} from "../../functions/SetRandomAvatarBack";
import {setId} from "../../functions/SetId";
import {Select} from 'antd';
import {IProject} from "../../interfaces/ProjectInterface";

const { Option } = Select;

const Create: FC = () => {
    const history = useHistory();
    const location = useLocation()
    const [name, setName] = useState<string>('');
    const {orgs, setOrgs} = useContext(Orgs);
    const params = new URLSearchParams(location.search);
    const orgId = params.get('org_id');
    const type = params.get('type');
    const org: any = orgs.find(({org_id}) => org_id === orgId);
    const [whichOrg, setWhichOrg] = useState<string>(org && org.org_name);
    const handleSubmit = (e: FormEvent):void => {
        e.preventDefault();
        if(type === 'org') {
            setOrgs([{
                org_name: name,
                org_id: setId(name),
                org_avatar_txt: Acroname(name),
                org_avatar_back: setRandomAvatarBack(),
                projects: []
            }, ...orgs])
            history.push(`/w/o/${setId(name)}/overview`);
        } else if (type === 'project') {
            const pushHere: any = orgs.find(({org_name}) => org_name === whichOrg);
            const project: IProject = {
                project_name: name,
                project_id: setId(name),
                project_avatar_txt: Acroname(name),
                project_avatar_back: setRandomAvatarBack(),
                tabs: [{text: 'Lists', id: 'lists', tasks: []}]
            }
            pushHere.projects.push(project);
            setOrgs([...orgs]);
            history.push(`/w/p/${pushHere.org_id}/${setId(name)}/overview`);
        }
    //    always
        setName('');
    }
    return <div className='create d-flex flex-column w-100 h-100'>
        <header className='p-4 border-bottom d-flex align-items-center justify-content-end'>
            <i onClick={() => history.goBack()} className='pointer'>
                <MdClear/>
            </i>
        </header>
        <div className="form-wrapper w-100 h-100">
            <h2>Create {type === 'org' ? 'Organization' : 'Project'}</h2>
            <form onSubmit={handleSubmit} className='mt-4 pt-2 d-flex gap-4 flex-column mb-5'>
                <label className='w-100'>
                    <input value={name}
                           onChange={(e) => setName(e.target.value)}
                           className='w-100' type="text" required/>
                    <span className='text-silver thick'>{type === 'org' ? 'Organization' : 'Project'} name</span>
                </label>
                {type === 'project' &&
                    <>
                <div>
                    <h5 className='text-silver thick'>Organization</h5>
                <Select
                    className='w-100'
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Search to Select"
                    optionFilterProp="children"
                    onSelect={(e, value) => setWhichOrg(value.children)}
                    filterOption={(input, option:any) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    filterSort={(optionA, optionB) =>
                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                    }
                    defaultValue={org.org_name}
                >
                    {orgs.map((org, i) => (
                        <Option key={org.org_id} value={i}>{org.org_name}</Option>
                    ))}
                </Select>
                </div>

                        <div>
                            <h5 className='text-silver thick'>Template</h5>
                            <Select
                                className='w-100'
                                showSearch
                                style={{ width: 200 }}
                                placeholder="(Blank Project)"
                                optionFilterProp="children"
                                filterOption={(input, option:any) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                filterSort={(optionA, optionB) =>
                                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                }
                            >
                            </Select>
                        </div>
                    </>
                }
                <label className='submit-sec d-flex w-100 gap-3 pt-1 align-items-center justify-content-end'>
                    <button type='submit' className='submit-btn'>Create</button>
                    <button onClick={() => history.goBack()} type='reset' className='cancel-btn'>Cancel</button>
                </label>
            </form>
        </div>
    </div>
}

export default Create;
