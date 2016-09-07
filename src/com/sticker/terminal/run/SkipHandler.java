package com.sticker.terminal.run;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.jfinal.handler.Handler;

public class SkipHandler extends Handler{

	@Override
	public void handle(String target, HttpServletRequest request,
            HttpServletResponse response, boolean[] isHandled) {

        //对于websocket 不交予 jfinal 处理
        if (target.indexOf("/socket") == -1) {
            nextHandler.handle(target, request, response, isHandled);
        }
    }
	
}
