import React, { useState } from 'react';
import { PageArea } from './styled';
import { PageContainer, PageTitle, ErrorMessage } from '../../components/templatecomponents';
import { doLogin, doLogout } from '../../helpers/AuthHandler';

//buscando api no serve hook
import useApi from '../../helpers/Api';


const  Page =  () => {
    //chamando a api
    const api = useApi();
    //criando chamadas usestate LOGIN
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberPassword, setRememberPassword ] = useState(false);
    //btn desabilitado
    const [disabled,setDisabled] = useState(false);
    const [error, setError] = useState('');

    //TRATAR FORMULARIO
    const handleSubmit = async (e) =>{
        e.preventDefault();
        //bloqueia
        setDisabled(true);
        const json = await api.login(email, password);

        //teve error
        if(json.error){
            setError(json.error);
        //nao teve error
        }else{
            doLogin(json.token, rememberPassword);
            window.location.href = '/';
        }
        //debloqueia
        setDisabled(false);
    }

    return (
        <PageContainer>
            <PageTitle>Login</PageTitle>
            <PageArea>
                {/* MONSTRANO ERROR */}
                {error &&
                    <ErrorMessage>{error}</ErrorMessage>
                }    
                <form onSubmit={handleSubmit}>
                    <label className="area">
                        <div className="area--title">E-mail</div>
                        <div className="area--input">
                            <input 
                            type="email"
                            disabled={disabled}
                            value={email}
                            onChange={e=>setEmail(e.target.value)}
                            required
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Senha</div>
                        <div className="area--input">
                            <input 
                            type="password"
                            disabled={disabled}
                            value={password}
                            onChange={e=>setPassword(e.target.value)}
                            required
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Lembrar Senha</div>
                        <div className="">
                            <input 
                            type="checkbox"
                            disabled={disabled}   
                            value={rememberPassword}
                            onChange={()=>setRememberPassword(!rememberPassword)} 
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title"></div>
                        <div className="area--input">
                            <button  disabled={disabled} >Logar</button>
                        </div>
                    </label>
                </form>
            </PageArea>
        </PageContainer>

    );
}

export default Page;

