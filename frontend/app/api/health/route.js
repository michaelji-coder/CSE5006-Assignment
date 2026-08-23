import { NextResponse } from 'next/server';
import * as fileDb from '../../../lib/fileDb.js';

export async function GET() {
  try {
    const { sequelize, Counter } = await import('../../../models/index.js');
    await sequelize.authenticate();
    const uptime = process.uptime();
    const counter = await Counter.findOne({ where: { name: 'requests' } });
    return NextResponse.json({ status: 'ok', uptime, requests: counter ? counter.value : 0 });
  } catch (err) {
    try {
      const uptime = process.uptime();
      const c = fileDb.readCounter();
      return NextResponse.json({ status: 'ok', uptime, requests: c.requests });
    } catch (e) {
      return NextResponse.json({ status: 'error', error: err.message }, { status: 500 });
    }
  }
}
