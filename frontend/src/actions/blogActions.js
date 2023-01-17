import {RABAT_CODE_ADD_FAIL, RABAT_CODE_ADD_SUCCESS} from "../constants/rabatCodeConstants";
import Axios from "axios";
import {
    BLOG_ADD_FAIL,
    BLOG_ADD_IMAGE_FAIL,
    BLOG_ADD_IMAGE_REQUEST,
    BLOG_ADD_IMAGE_SUCCESS,
    BLOG_ADD_REQUEST, BLOG_ADD_SUCCESS,
    BLOG_DELETE_FAIL,
    BLOG_DELETE_REQUEST,
    BLOG_DELETE_SUCCESS,
    BLOG_DETAILS_FAIL,
    BLOG_DETAILS_REQUEST,
    BLOG_DETAILS_SUCCESS,
    BLOG_LIST_FAIL,
    BLOG_LIST_REQUEST,
    BLOG_LIST_SUCCESS,
    BLOG_UPDATE_FAIL,
    BLOG_UPDATE_REQUEST,
    BLOG_UPDATE_SUCCESS
} from "../constants/blogConstants";

export const getBlogs = () => async (dispatch, getState) => {
    dispatch({type: BLOG_LIST_REQUEST});
    try {
        const {data} = await Axios.get(`/blog`);
        dispatch({type: BLOG_LIST_SUCCESS, payload: data});
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({type: BLOG_LIST_FAIL, payload: message});
    }
};

export const detailsBlog = (id) => async (dispatch) => {
    dispatch({type: BLOG_DETAILS_REQUEST, payload: id});
    try {
        const {data} = await Axios.get(`/blog/${id}`);
        dispatch({type: BLOG_DETAILS_SUCCESS, payload: data});
    } catch (error) {
        dispatch({
            type: BLOG_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const addBlog = (title, author, article, bodyFormData) => async (dispatch, getState) => {
    dispatch({type: BLOG_ADD_REQUEST});
    const {
        userSignin: {userInfo},
    } = getState();
    try {
        const {data} = await Axios.post(`/blog`,
            {
                title,
                author,
                article
            }
            , {
                headers: {Authorization: `Bearer ${userInfo.token}`},
            });
        dispatch({type: BLOG_ADD_SUCCESS, payload: data});
        dispatch(addImageToBlog(data.id, bodyFormData))
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({type: BLOG_ADD_FAIL, error: message});
    }
};

export const updateBlog = (id, title, author, article, bodyFormData) => async (dispatch, getState) => {
    dispatch({type: BLOG_UPDATE_REQUEST, payload: id});
    const {
        userSignin: {userInfo},
    } = getState();
    try {
        const {data} = await Axios.put(`/blog/${id}/update`,
            {
                title,
                author,
                article
            }
            , {
                headers: {Authorization: `Bearer ${userInfo.token}`},
            });
        dispatch({type: BLOG_UPDATE_SUCCESS, payload: data});
        if (bodyFormData !== null) {
            dispatch(addImageToBlog(data.id, bodyFormData))
        }
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({type: BLOG_UPDATE_FAIL, error: message});
    }
};

export const deleteBlog = (id) => async (dispatch, getState) => {
    dispatch({type: BLOG_DELETE_REQUEST, payload: id});
    const {userSignin: {userInfo}} = getState();
    try {
        const {data} = await Axios.delete(`/blog/${id}/delete`, {
            headers: {Authorization: `Bearer ${userInfo.token}`},
        });
        dispatch({type: BLOG_DELETE_SUCCESS});
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({type: BLOG_DELETE_FAIL, payload: message});
    }
};


export const addImageToBlog = (id, bodyFormData) => async (dispatch, getState) => {
    dispatch({type: BLOG_ADD_IMAGE_REQUEST});
    const {userSignin: {userInfo}} =
        getState();
    try {
        const {data} = await Axios.post(`/blog/${id}`, bodyFormData, {
            headers: {Authorization: `Bearer ${userInfo.token}`},
        });
        dispatch({type: BLOG_ADD_IMAGE_SUCCESS, payload: true});
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({type: BLOG_ADD_IMAGE_FAIL, payload: message});
    }
}