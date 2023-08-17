import nodeSchedule from 'node-schedule';

const scheduler = ( () => {
  const schedules = new Map();

  return {
    makeSchedule: ({ id, executionDate, job }) => {
      const anSchedule = nodeSchedule.scheduleJob(  executionDate, async () => {
        try {
          await job();
          schedules.delete( id );
          console.log( `do ${id} job` );
        } catch ( error ) {
          console.log( error, `error on doing scheduled ${id} job` );
          setTimeout( job, 1000 * 60 * 60 * 1 );
        }
      });
      schedules.set( id, anSchedule );
    },
    getSchedule: ( id ) => schedules.get( id ),
    cancelSchedule: ( id ) => {
      nodeSchedule.cancelJob( schedules.get( id ) );
      schedules.delete( id );
    },
  };
})();

export default scheduler;
