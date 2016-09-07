package com.sticker.terminal.run;

import java.io.IOException;

import com.jfinal.config.Constants;
import com.jfinal.config.Handlers;
import com.jfinal.config.Interceptors;
import com.jfinal.config.Plugins;
import com.jfinal.config.Routes;
import com.jfinal.plugin.activerecord.ActiveRecordPlugin;
import com.jfinal.plugin.activerecord.CaseInsensitiveContainerFactory;
import com.jfinal.plugin.activerecord.dialect.MysqlDialect;
import com.jfinal.plugin.activerecord.dialect.OracleDialect;
import com.jfinal.plugin.druid.DruidPlugin;
import com.jfinal.plugin.ehcache.EhCachePlugin;
import com.jfinal.render.ViewType;
import com.sticker.terminal.model.SequenceRuleModel;
public class JFinalConfig extends com.jfinal.config.JFinalConfig {

	public static String path;
	public static String imgpath, panopath, panobatpath, rootpath, webURL,
			fileURL;
	public static String arcService;
	public static Integer pageSize;

	@Override
	public void configConstant(Constants me) {
		loadPropertyFile("init.properties");
		me.setDevMode(true);
		me.setViewType(ViewType.JSP);
		/*me.setEncoding(ToolString.encoding);*/

		/*
		 * me.setUploadedFileSaveDirectory(PathKit.getWebRootPath() +
		 * "/images/index");
		 */

		me.setError401View("/veiew/common/401.html");
		me.setError403View("/view/common/403.html");
		me.setError404View("/view/common/404.html");
		me.setError500View("/view/common/500.html");
	}

	@Override
	public void configRoute(Routes me) {
		me.add(new AdminRoutingConfig());
	}

	@Override
	public void configPlugin(Plugins me) {
		/*path = getProperty("filepath");
		imgpath = getProperty("imgpath");
		panopath = getProperty("panopath");
		panobatpath = getProperty("panobatpath");
		rootpath = getProperty("path");
		webURL = getProperty("webURL");
		fileURL = getProperty("fileURL");
		pageSize = getPropertyToInt("pageSize", 25);
		arcService = getProperty("arcService");
		ActiveRecordPlugin arp = null;
		ActiveRecordPlugin arp1 = null;*/
		
		//mysql start
		/*String mysql_jdbcUrl = getProperty("mysql.jdbcUrl").trim();
		String mysql_userName = getProperty("mysql.userName").trim();
		String mysql_passWord = getProperty("mysql.passWord").trim();
		DruidPlugin druidPlugin = new DruidPlugin(mysql_jdbcUrl,
				mysql_userName, mysql_passWord);
		me.add(druidPlugin);

		arp = new ActiveRecordPlugin(druidPlugin);
		arp.setContainerFactory(new CaseInsensitiveContainerFactory(true));// 灏忓啓
		arp.setDialect(new MysqlDialect()); // 鏁版嵁搴撴柟锟�
*/		//mysql end
		
		//oracle start
		/*String oracle_driverClass = getProperty("oracle.driverClass")
				.trim();
		String oracle_jdbcUrl = getProperty("oracle.jdbcUrl").trim();
		String oracle_userName = getProperty("oracle.userName").trim();
		String oracle_passWord = getProperty("oracle.passWord").trim();
		DruidPlugin druidPlugin1 = new DruidPlugin(oracle_jdbcUrl,
				oracle_userName, oracle_passWord, oracle_driverClass);
		me.add(druidPlugin1);

		arp1 = new ActiveRecordPlugin("oracleMain",druidPlugin1);// 璁剧疆鏁版嵁搴撴柟锟�
		arp1.setDialect(new OracleDialect());
		arp1.setContainerFactory(new CaseInsensitiveContainerFactory(true));// 蹇界暐澶у皬锟�
		me.add(new EhCachePlugin());*/
		//oracle end
		
		// 1.鏁版嵁搴撶被鍨嬪垽锟�
		/*String db_type = getProperty("db.type");
		if (db_type.equals("postgresql")) { // pg
			// 1.1 閰嶇疆Druid鏁版嵁搴撹繛鎺ユ睜鎻掍欢
			String postgresql_driverClass = getProperty(
					"postgresql.driverClass").trim();
			String postgresql_jdbcUrl = getProperty("postgresql.jdbcUrl")
					.trim();
			String postgresql_userName = getProperty("postgresql.userName")
					.trim();
			String postgresql_passWord = getProperty("postgresql.passWord")
					.trim();
			DruidPlugin druidPlugin = new DruidPlugin(postgresql_jdbcUrl,
					postgresql_userName, postgresql_passWord,
					postgresql_driverClass);
			me.add(druidPlugin);

			// 1.2 閰嶇疆ActiveRecord鎻掍欢
			arp = new ActiveRecordPlugin(druidPlugin);
			arp.setDialect(new PostgreSqlDialect()); // 鏁版嵁搴撴柟锟�

		} else if (db_type.equals("mysql")) { // mysql
			// 1.1 閰嶇疆Druid鏁版嵁搴撹繛鎺ユ睜鎻掍欢
			String mysql_jdbcUrl = getProperty("mysql.jdbcUrl").trim();
			String mysql_userName = getProperty("mysql.userName").trim();
			String mysql_passWord = getProperty("mysql.passWord").trim();
			DruidPlugin druidPlugin = new DruidPlugin(mysql_jdbcUrl,
					mysql_userName, mysql_passWord);
			me.add(druidPlugin);

			// 1.2 閰嶇疆ActiveRecord鎻掍欢
			arp = new ActiveRecordPlugin(druidPlugin);
			arp.setContainerFactory(new CaseInsensitiveContainerFactory(true));// 灏忓啓
			arp.setDialect(new MysqlDialect()); // 鏁版嵁搴撴柟锟�
		} else if (db_type.equals("oracle")) {

			String oracle_driverClass = getProperty("oracle.driverClass")
					.trim();
			String oracle_jdbcUrl = getProperty("oracle.jdbcUrl").trim();
			String oracle_userName = getProperty("oracle.userName").trim();
			String oracle_passWord = getProperty("oracle.passWord").trim();
			DruidPlugin druidPlugin = new DruidPlugin(oracle_jdbcUrl,
					oracle_userName, oracle_passWord, oracle_driverClass);
			me.add(druidPlugin);

			// 1.2 閰嶇疆ActiveRecord鎻掍欢
			arp = new ActiveRecordPlugin(druidPlugin);// 璁剧疆鏁版嵁搴撴柟锟�
			arp.setDialect(new OracleDialect());
			arp.setContainerFactory(new CaseInsensitiveContainerFactory(true));// 蹇界暐澶у皬锟�
			me.add(new EhCachePlugin());
			// arp.setDialect(new OracleDialect());
			// arp.setContainerFactory(new
			// CaseInsensitiveContainerFactory(true));
		}*/
		/*me.add(arp);
		me.add(arp1);*/
		// 2. 缂撳瓨
		// me.add(new EhCachePlugin()); // EhCache缂撳瓨

		// 3.1 绯荤粺锟�
		// arp.addMapping("pt_syslog", "ids", Syslog.class); // 绯荤粺鏃ュ織锟�

		/*InitTable(arp);
		InitTable1(arp1);*/

	}

	private void InitTable(ActiveRecordPlugin arp) {

		/*
		 * arp.addMapping("s_sequencesrule",
		 * "patternname",SequenceRuleModel.class);
		 */
		

		// arp.addMapping("activities_img", "id", BActivitiesModel.class);

	}
	private void InitTable1(ActiveRecordPlugin arp) {

		
		 arp.addMapping("s_sequencesrule", "patternname",SequenceRuleModel.class);
		 
		/*arp.addMapping("gis_task", "id", BUserModel.class);*/
//		arp.addMapping("spots", "id", TestModel.class);
	
		// arp.addMapping("activities_img", "id", BActivitiesModel.class);

	}

	@Override
	public void configInterceptor(Interceptors me) {
		// TODO Auto-generated method stub

	}

	@Override
	public void configHandler(Handlers me) {
		// TODO Auto-generated method stub
		/*me.add(new ServletExcludeHadler());*/
		/* me.add(new SkipHandler());*/
	}

	@Override
	public void afterJFinalStart() {
		/*loadServlet();*/
		
		
	}

	/*private void loadServlet() {
		String webRoot = PathKit.getWebRootPath();
		WebApp webApp = WebAppDigester.digester(webRoot + "/WEB-INF/web.xml");
		if (webApp != null) {
			List<ServletMapping> servletMappings = webApp.getServletMappings();
			for (ServletMapping servletMapping : servletMappings) {
				System.out.println(servletMapping.getUrl());
				ServletExcludeHadler.servletSet.add(servletMapping.getUrl());
			}
		}
	}*/

}
