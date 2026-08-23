import { NextResponse } from 'next/server';
import * as fileDb from '../../../lib/fileDb.js';

export async function GET() {
  try {
    const { Counter } = await import('../../../models/index.js');
    const counter = await Counter.findOne({ where: { name: 'requests' } });
    return NextResponse.json({ requests: counter ? counter.value : 0 });
  } catch (err) {
    try {
      const c = fileDb.readCounter();
      return NextResponse.json({ requests: c.requests });
    } catch (e) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }
}

export async function POST() {
  try {
    const { Counter } = await import('../../../models/index.js');
    const [row] = await Counter.findOrCreate({ where: { name: 'requests' } });
    row.value = row.value + 1;
    await row.save();
    return NextResponse.json({ requests: row.value });
  } catch (err) {
    try {
      const c = fileDb.readCounter();
      c.requests = (c.requests || 0) + 1;
      fileDb.writeCounter(c);
      return NextResponse.json({ requests: c.requests });
    } catch (e) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }
}
