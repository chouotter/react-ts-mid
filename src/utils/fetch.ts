/**
 * 異步呼叫api, 只可用響應體為 json 的 api
 * @param api 要呼叫的api
 * @returns json 結果
 */
export async function asyncGet(api: string):Promise<any>{
    try {
        const res: Response = await fetch(api)
        try {
            return await res.json()
        } catch (error) {
            return error
        }
    } catch (error) {
        return error
    }
}

export async function asyncPost(api: string, body: {} | FormData) {
    const res: Response = await fetch(api, {
        method: 'POST',
        credentials: 'include',
        headers:new Headers({
            'Access-Control-Allow-Origin':"http://localhost:5173/",
            'content-Type':"application/json"
        }),
        body: body instanceof FormData?body:JSON.stringify(body),
        mode:"cors"
    })
    try {
        let data = res.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

export async function asyncPatch(api: string, body: {} | FormData) {
    const res: Response = await fetch(api, {
        method: 'PATCH',
        headers:new Headers({
            'Access-Control-Allow-Origin':"http://localhost:5173/",
        }),
        body: body instanceof FormData?body:JSON.stringify(body),
        mode:"cors"
    })
    try {
        let data = res.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

export async function asyncDelete(api: string, body: { userName: string }) {
    try {
        const res: Response = await fetch(api, {
            method: 'DELETE', 
            credentials: 'include',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify(body),
            mode: 'cors', 
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || '刪除請求失敗');
        }

        return data;

    } catch (error) {
        console.error('Delete request failed', error);
        throw error; 
    }
}

export async function asyncUpdate(api: string, body: { userName: string; name: string }) {
    try {
        const res: Response = await fetch(api, {
            method: 'PUT',
            credentials: 'include',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify(body),
            mode: 'cors',
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || '更新請求失敗');
        }

        return data;
    } catch (error) {
        console.error('Update request failed', error);
        throw error;
    }
}