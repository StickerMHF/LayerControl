package com.sticker.terminal.run;


import com.jfinal.config.Routes;
import com.sticker.terminal.control.OperationController;

public class AdminRoutingConfig extends Routes {

	@Override
	public void config() {
		
		add("/general/tree",OperationController.class);
	}

}
