'use client'
import React, { useEffect, useRef } from 'react';
import { models } from 'powerbi-client';

export type PowerBIEmbedProps = {
  accessToken: string;
  reportId: string;
  groupId: string;
};

const PowerBIEmbed: React.FC<PowerBIEmbedProps> = ({ accessToken, reportId, groupId }) => {
  const embedContainer = useRef<HTMLDivElement>(null);
  let powerbi: any = null; // Define powerbi variable to hold the powerbi client object

  useEffect(() => {
    const getEmbedUrl = async () => {
      try {
        const response = await fetch(`https://api.powerbi.com/v1.0/groups/${groupId}/reports/${reportId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch report data');
        //   alert("failed")
        }

        const responseData = await response.json();

        if (!responseData || !responseData.embedUrl) {
          throw new Error('Invalid response data');
        }

        const embedUrl = responseData.embedUrl;

        const embedConfig: models.IEmbedConfiguration = {
          type: 'report',
          embedUrl: embedUrl,
          accessToken: accessToken,
          tokenType: models.TokenType.Embed,
          id: reportId,
          settings: {
            panes: {
              filters: {
                expanded: false,
                visible: false,
              },
            },
          },
        };

        if (embedContainer.current && window.powerbi) {
          powerbi = window.powerbi;
          const report = powerbi.embed(embedContainer.current, embedConfig);

          // Event handling
          report.on('loaded', () => {
            console.log('Report loaded');
           
          });

          report.on('rendered', () => {
            console.log('Report rendered');
          });

          report.on('error', (event: any) => {
            console.error('Error:', event.detail);
        
          });

          return () => {
            report.off('loaded');
            report.off('rendered');
            report.off('error');

            // Check if powerbi object exists before calling reset
            if (powerbi) {
              powerbi.reset(embedContainer.current);
            }
          };
        } else {
          console.error('Power BI client library not found.');
         
        }
      } catch (error) {
        console.error('Error fetching or parsing Power BI report data:', error);
        alert("Reports not available")
     
      }
    };

    getEmbedUrl();
  }, [accessToken, reportId, groupId]);

  return <div ref={embedContainer} style={{ height: '600px', width: '100%' }} />;
};

export default PowerBIEmbed;
