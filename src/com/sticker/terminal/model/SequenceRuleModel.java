package com.sticker.terminal.model;

import org.apache.log4j.Logger;

import com.jfinal.plugin.activerecord.ActiveRecordException;
import com.jfinal.plugin.activerecord.Model;

/**
 * @ 对系统的Sequece进行管理
 * 
 * @author dengl
 * 
 */
public class SequenceRuleModel extends Model<SequenceRuleModel> {

	private static final long serialVersionUID = 1L;
	private static Logger log = Logger.getLogger(SequenceRuleModel.class);

	public static final SequenceRuleModel dao = new SequenceRuleModel();

	public static String tablename = "s_sequencesrule";

	public Integer getNextVal(String tarTableName, String Primekey) {

		CreateSeq(tarTableName, Primekey, 0, 99999999, 1, 1);
		String sql = new StringBuffer("select * from ").append(tablename)
				.append(" where ").append("patternname").append(" = ? ")
				.toString();
		SequenceRuleModel modelOld = findFirst(sql, tarTableName);
		if (null == modelOld) {
			throw new ActiveRecordException("没有设置生成对应的表的sequence");
		}
		Number n = modelOld.getNumber("nextvalue");
		// this.set(this, value)
		modelOld.set("nextvalue", n.intValue()
				+ modelOld.getNumber("step").intValue());
		modelOld.update();
		return n.intValue();

	}

	/**
	 * 创建sequenece
	 * 
	 * @author dengl
	 * @param tablename
	 * @param Tablefield
	 * @param minval
	 * @param maxval
	 * @param step
	 * @param netxval
	 * @return
	 */
	public boolean CreateSeq(String Tartablename, String Tablefield,
			int minval, int maxval, int step, int netxval) {

		// 1.数据是否还存在
		String sql = new StringBuffer("select STEP from ").append(tablename)
				.append(" where ").append("PATTERNNAME").append(" = ? ")
				.toString();
		SequenceRuleModel modelOld = findFirst(sql, Tartablename);
		if (null != modelOld) { // 数据已经被删除
			return true;
		}
		this.set("patternname", Tartablename);
		this.set("tablefield", Tablefield);
		this.set("minvalue", minval);
		this.set("maxvalue", maxval);
		this.set("step", step);
		this.set("nextvalue", minval + step);
		this.set("continuum", 0);
		// this.set("continuum", new java.util.Date());

		return this.save();
	}

}
